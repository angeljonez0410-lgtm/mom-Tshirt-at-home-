import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    isAdmin?: boolean;
    user?: {
      email?: string | null;
      name?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isAdmin?: boolean;
  }
}
