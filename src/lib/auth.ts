import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
import { authConfig } from "./auth.config";
async function getUser(email: string, password: string) {
  try {
    const user =
      await sql`SELECT * FROM users WHERE email = ${email} AND password = ${password};`;
    return user.rows[0];
  } catch (error) {
    console.log("Falha na autenticação:", error);
    throw new Error("Falha na autenticação");
  }
}

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any) {
        const { email, password } = credentials;
        const user = await getUser(email, password);
        if (!user) return null;
        return user || null;
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
  ],
});
