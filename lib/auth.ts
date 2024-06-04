import axios from "@/lib/axios";
import { LoginMedia, RegisterMedia } from "@/lib/utils/action/AuthActions";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import NextAuth, { NextAuthConfig } from "next-auth";
import "next-auth/jwt";

const config = {
  theme: { logo: "/assets/icon/logo.png" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
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
        try {
          const res = await axios.post(`/oauth/token`, credentials);
          return res.data.data;
        } catch (error: any) {
          console.log(error.response.data);
          throw new Error(error.response.data.error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, trigger, session, account, user }) {
      // console.log("account auth : ", account);
      // console.log("user auth : ", user);
      // if (trigger === "update") token.name = session.user.name;
      let dateNow = Date.now();
      if (
        account?.provider === "google" &&
        user.email &&
        account.access_token
      ) {
        try {
          const res = await LoginMedia(user.email, account.access_token);

          // console.log("res login :", res);

          if (res.status_code === 200) {
            return {
              ...token,
              user: {
                id: res.data.users.id,
                name: res.data.users.profile.name,
                email: res.data.users.email,
                picture: res.data.users.profile.avatar_url,
                roles: res.data.users.roles,
              },
              access_token: res.data.access_token,
              refresh_token: res.data.refresh_token,
              expires_at: Math.ceil(dateNow + res.data.expires_in * 1000),
            };
          }

          if (res.error.status_code === 401) {
            console.log("lakukan register", {
              name: user.name,
              email: user.email,
              access_token: account.access_token,
            });

            try {
              const regRes = await RegisterMedia(
                user.name as string,
                user.email,
                account.access_token
              );

              // console.log("res register:", regRes);

              return {
                ...token,
                user: {
                  id: regRes.data.users.id,
                  name: regRes.data.users.profile.name,
                  email: regRes.data.users.email,
                  picture: regRes.data.users.profile.avatar_url,
                  roles: regRes.data.users.roles,
                },
                access_token: regRes.data.access_token,
                refresh_token: regRes.data.refresh_token,
                expires_at: Math.ceil(dateNow + regRes.data.expires_in * 1000),
              };
            } catch (regErr) {
              console.log("error google register:", regErr);
              throw new Error("Registration failed");
            }
          }
        } catch (loginErr) {
          console.log("error google login:", loginErr);
          throw new Error("Login failed");
        }
      }

      if (user && user.users) {
        return {
          ...token,
          user: {
            id: user.users.id,
            name: user.users.profile.name,
            email: user.users.email,
            picture: user.users.profile.avatar_url,
            roles: user.users.roles,
          },
          access_token: user.access_token,
          refresh_token: user.refresh_token,
          expires_at: Math.ceil(dateNow + user.expires_in * 1000),
        };
      }
      if (trigger === "update") {
        console.log("lakukan refresh token");
        return { ...token, ...session };
      }
      // console.log("token jwt :", token);
      return token;
    },
    async session({ session, token }) {
      // console.log("token session : ", token);
      return {
        ...session,
        user: token.user,
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        expires_at: token.expires_at,
      };
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

declare module "next-auth" {
  interface Session {
    access_token: string;
    refresh_token: string;
    expires_at: number;
    user: {
      id: number;
      email: string;
      name: string;
      roles: string[];
    };
  }

  interface User {
    users: {
      email_status: string;
      id: number;
      username: string;
      email: string;
      access_token: string;
      roles: string[];
      profile: {
        name: string;
        avatar_url: string | null;
      };
    };
    expires_at: number;
    expires_in: number;
    access_token: string;
    refresh_token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      // email_status: string;
      id: number;
      name: string;
      email: string;
      picture: string | null;
      roles: string[];
    };
    expires_at: number;
    access_token: string;
    refresh_token: string;
  }
}
