import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { authConfig } from "./auth.config";
import { getUser } from "./requisicoes";

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
        const req = await getUser(email);
        const user = await req?.users[0];
        const isValid = await bcrypt.compare(password, user?.password || "");

        if (!user) return null;
        if (!isValid) throw new Error("Email ou senha inválidos");
        return user;
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
  ],
});
