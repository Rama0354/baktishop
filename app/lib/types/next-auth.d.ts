import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    verifed: string;
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      roles: string[];
      avatar_url:string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    role: string;
    data: {
      users: {
        email_verified_at:string | null;
        id: string;
        username: string;
        email: string;
        access_token: string;
        roles: string[];
        profile:{
          name: string;
          avatar_url:string;
        }
      };
      expires_at: number;
      expires_in: number;
      access_token: string;
      refresh_token: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user_id: string;
    verifed: string;
    name: string;
    username: string;
    roles: string[];
    avatar_url:string;
    access_token: string;
    refresh_token: string;
    expires_in: number;
    expires_at: number;
  }
}
