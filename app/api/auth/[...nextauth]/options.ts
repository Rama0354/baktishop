import axios from "axios";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type Token ={
  user_id: string;
  name: string;
  roles: string[];
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
}

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
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.BACKEND_API}/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (res.ok && data) {
          return data;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user_id = user.data.users.user_id;
        token.name = user.data.users.name;
        token.username = user.data.users.username;
        token.email = user.data.users.email;
        token.avatar_url = user.data.users.profile.avatar_url;
        token.roles = user.data.users.roles;
        token.access_token = user.data.access_token;
        token.refresh_token = user.data.refresh_token;
        token.expires_at = Math.floor((Date.now() / 1000)+ user.data.expires_in);

      }
      if(Date.now() < (token.expires_at * 1000)) {
        return token;
      }
      return await refreshTokenApiCall(token)
    },
    async session({ session, token }) {
      if (token) {
        session.user.name = token.name;
        session.user.username = token.username;
        session.user.email = token.email!;
        session.user.avatar_url = token.avatar_url!;
        session.user.roles = token.roles;
        session.accessToken = token.access_token;
      }
      return session;
    },
  },
};

const refreshTokenApiCall = async (token:any) => {
  try {
    const res = await axios.post(
      `${process.env.BACKEND_API}/refresh-token`,
      {
        refresh_token: token.refresh_token,
      }
    );
    if (res.status === 200) {
      return {
        ...token,
        access_token : res.data.data.access_token,
        expires_at : Math.floor((Date.now() / 1000) + res.data.data.expires_in),
        refresh_token : res.data.data.refresh_token,
      }
    } else {
      console.error("Error refreshing access token", res.status, res.data);
      return { ...token, error: "RefreshAccessTokenError" as const };
    }
  } catch (error) {
    console.error("Error refreshing access token", error);
    return { ...token, error: "RefreshAccessTokenError" as const };
  }
}