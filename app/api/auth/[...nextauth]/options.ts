import axios from "axios";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

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
        try {
          const res = await axios.post(`${process.env.BACKEND_API}/login`,credentials, {
            headers: { "Content-Type": "application/json" }
          });
          return res.data
        } catch (error:any) {
          console.log(error.response.data.message)
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
      let dateNow = Date.now()
      let setDay = 24 * 60 * 60 * 1000;
      if (user) {
        token.user_id = user.data.users.id;
        token.roles = user.data.users.roles;
        token.verifed = user.data.users.email_verified_at !== null ? 'verifed':'unverifed'
        token.access_token = user.data.access_token;
        token.refresh_token = user.data.refresh_token;
        token.expires_at = Math.ceil(dateNow + (user.data.expires_in * 1000))
      }
      if(dateNow <= token.expires_at) {
        // console.log('sekarang : ' + (dateNow))
        // console.log('diatur : ' +token.expires_at)
        // console.log('tanggal sekarang : ' + new Date(dateNow))
        // console.log('tanggal diatur : ' + new Date(token.expires_at))
        return token
      }
      if(dateNow > token.expires_at){
        console.log('lakukan refresh token')
        return await refreshTokenApiCall(token)
      }
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.user_id;
        session.verifed = token.verifed;
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
        expires_at : Math.ceil(Date.now() + (res.data.data.expires_in * 1000)),
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