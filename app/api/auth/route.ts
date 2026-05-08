import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Replace with your user lookup logic
        if (
          credentials?.email === "angeljonez0410@gmail.com" &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "1", email: credentials.email, isAdmin: true };
        }
        // Example: allow any email/password for demo (replace with DB check)
        if (credentials?.email && credentials?.password) {
          return { id: credentials.email, email: credentials.email };
        }
        return null;
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      if (token.isAdmin) session.isAdmin = true;
      return session;
    },
    async jwt({ token, user }) {
      if ((user as any)?.isAdmin) token.isAdmin = true;
      return token;
    }
  }
});

export { handler as GET, handler as POST };