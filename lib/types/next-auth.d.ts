import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      roles: string[];
      access_token: string;
      refresh_token: string;
      expires_at: number;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    users: {
      email_status: string;
      id: string;
      username: string;
      email: string;
      access_token: string;
      roles: string[];
    };
    expires_at: number;
    expires_in: number;
    access_token: string;
    refresh_token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    email: string;
    email_status: string;
    roles: string[];
    access_token: string;
    refresh_token: string;
    expires_in: number;
    expires_at: number;
  }
}
