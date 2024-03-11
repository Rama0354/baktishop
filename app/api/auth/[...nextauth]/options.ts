import axios from "@/lib/axios";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "E-mail",
          type: "text",
          placeholder: "example@mail.com",
        },
        password: { label: "Password", type: "password" },
        is_register: { type: "string" },
      },
      async authorize(credentials) {
        const is_register =
          credentials && credentials.is_register !== null
            ? credentials.is_register
            : false;
        try {
          if (is_register === "true") {
            const res = await axios.post(`/oauth/token/register`, {
              credentials,
            });
            return res.data.data;
          } else {
            const res = await axios.post(`/oauth/token`, credentials);
            return res.data.data;
          }
        } catch (error: any) {
          console.log(error.response.data);
          throw new Error(error.response.data.error.message);
        }
      },
    }),
    // {
    //   id:'google',
    //   name:'Google',
    //   type:'oauth',
    //   wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
    //   authorization: { params: { scope: "openid email profile" } },
    //   idToken: true,
    //   checks: ["pkce", "state"],
    //   profile(profile:any) {
    //     return {
    //       id: profile.sub,
    //       name: profile.name,
    //       email: profile.email,
    //       image: profile.picture,
    //     }
    //   },
    // }
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger, session, account }) {
      let dateNow = Date.now();
      if (user) {
        token.id = user.users.id;
        token.roles = user.users.roles;
        token.email = user.users.email;
        token.access_token = user.access_token;
        token.refresh_token = user.refresh_token;
        token.expires_at = Math.ceil(dateNow + user.expires_in * 1000);
      }
      if (trigger === "update") {
        console.log("lakukan refresh token");
        return { ...token, ...session.user };
      }
      return token;
    },
    async session({ session, token }) {
      return { ...session, user: token };
    },
  },
};
