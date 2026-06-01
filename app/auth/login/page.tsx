"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.replace("/members");
    }
  }, [session, status, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error || "Invalid email or password");
      } else if (result?.ok) {
        router.replace("/members");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className=\"min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff7ef] to-[#ffe4ea]\">\n        <div>Loading...</div>\n      </div>\n    );\n  }

  return (\n    <main className=\"min-h-screen bg-gradient-to-br from-[#fff7ef] to-[#ffe4ea] px-4 py-16\">\n      <div className=\"mx-auto max-w-md\">\n        <div className=\"bg-white rounded-[2rem] p-8 shadow-2xl shadow-black/10\">\n          <h1 className=\"font-serif text-3xl text-[#1a1717] mb-2\">Welcome Back</h1>\n          <p className=\"text-[#6b6565] mb-6\">Sign in to access your downloads</p>\n\n          {error && (\n            <div className=\"mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm\">\n              {error}\n            </div>\n          )}\n\n          <form onSubmit={handleLogin} className=\"space-y-4\">\n            <div>\n              <label className=\"block text-sm font-semibold text-[#1a1717] mb-2\">\n                Email\n              </label>\n              <input\n                type=\"email\"\n                value={email}\n                onChange={(e) => setEmail(e.target.value)}\n                placeholder=\"your@email.com\"\n                required\n                className=\"w-full px-4 py-2 border border-[#e0dada] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ab42]\"\n              />\n            </div>\n\n            <div>\n              <label className=\"block text-sm font-semibold text-[#1a1717] mb-2\">\n                Password\n              </label>\n              <input\n                type=\"password\"\n                value={password}\n                onChange={(e) => setPassword(e.target.value)}\n                placeholder=\"••••••••\"\n                required\n                className=\"w-full px-4 py-2 border border-[#e0dada] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ab42]\"\n              />\n            </div>\n\n            <button\n              type=\"submit\"\n              disabled={loading}\n              className=\"w-full py-2 bg-[#d6ab42] text-black font-semibold rounded-lg hover:bg-[#e1ba57] disabled:opacity-50 transition\"\n            >\n              {loading ? \"Signing in...\" : \"Sign In\"}\n            </button>\n          </form>\n\n          <p className=\"text-center text-sm text-[#6b6565] mt-6\">\n            Demo: Use any email/password to test\n            <br />\n            Admin: angeljonez0410@gmail.com\n          </p>\n        </div>\n      </div>\n    </main>\n  );\n}
