import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";

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
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (credentials) {
        return true;
      } else {
        return false;
      }
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any) {
        const { email, password } = credentials;
        const user = await getUser(email, password);
        if (!user) return null;
        const passwordMatch = user.password === password;
        if (!passwordMatch) return null;

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
