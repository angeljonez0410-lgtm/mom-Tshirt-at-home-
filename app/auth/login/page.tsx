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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff7ef] to-[#ffe4ea]">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fff7ef] to-[#ffe4ea] px-4 py-16">
      <div className="mx-auto max-w-md">
        <div className="bg-white rounded-[2rem] p-8 shadow-2xl shadow-black/10">
          <h1 className="font-serif text-3xl text-[#1a1717] mb-2">Welcome Back</h1>
          <p className="text-[#6b6565] mb-6">Sign in to access your downloads</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#1a1717] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-2 border border-[#e0dada] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ab42]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a1717] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 border border-[#e0dada] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ab42]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-[#d6ab42] text-black font-semibold rounded-lg hover:bg-[#e1ba57] disabled:opacity-50 transition"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-[#6b6565] mt-6">
            Demo: Use any email/password to test
            <br />
            Admin: angeljonez0410@gmail.com
          </p>
        </div>
      </div>
    </main>
  );
}