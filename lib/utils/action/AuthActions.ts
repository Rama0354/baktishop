"use server";

import { z } from "zod";
import {
  FormForgotPass,
  FormResetPass,
  RegisterActionSchema,
} from "@/lib/types/auth";
import axios, { axiosAuthServer } from "@/lib/axios";
import { redirect } from "next/navigation";

export async function LoginWithGoogle() {
  try {
    const res = await axiosAuthServer.get(`/auth/google`);
    const auth = res.data.data.auth_url;
    return auth;
  } catch (error) {
    console.log(error);
  }
}

export async function LogoutAction() {
  try {
    const res = await axiosAuthServer.post(`/logout`);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

const EmailVerification = z.string().email();
type EmailVerification = z.infer<typeof EmailVerification>;
export async function ResendEmailVerificationAction(data: EmailVerification) {
  try {
    await axios.post("/email/resend", {
      email: data,
    });
  } catch (error: any) {
    console.log(error.response.data);
  }
}

export async function RegisterAction(data: RegisterActionSchema) {
  try {
    const res = await axios.post(`/register`, {
      ...data,
      grant_type: "password",
    });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.log(
        `API request failed: ${error.response.status} - ${error.response.data.message}`
      );
      return error.response.data;
    } else if (error.request) {
      console.log(`API request failed: No response received`);
    } else {
      console.log(`Unexpected error: ${error.message}`);
    }
  }
}

export async function ForgotPasswordActions(data: FormForgotPass) {
  try {
    const res = await axios.post(`/forget/password`, data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.log(
        `API request failed: ${error.response.status} - ${error.response.data.message}`
      );
      return error.response.data;
    } else if (error.request) {
      console.log(`API request failed: No response received`);
    } else {
      console.log(`Unexpected error: ${error.message}`);
    }
  }
}

export async function ResetPasswordActions(data: FormResetPass) {
  try {
    const res = await axios.post(`/reset/password`, data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.log(
        `API request failed: ${error.response.status} - ${error.response.data.message}`
      );
      return error.response.data;
    } else if (error.request) {
      console.log(`API request failed: No response received`);
    } else {
      console.log(`Unexpected error: ${error.message}`);
    }
  }
}

export async function VerifedStatus(id: number) {
  try {
    const res = await axiosAuthServer.get(`/users/${id}`);
    return res.data.data.email_status;
  } catch (error: any) {
    if (error.response) {
      console.log(
        `API request failed: ${error.response.status} - ${error.response.data.message}`
      );
    } else if (error.request) {
      console.log(`API request failed: No response received`);
    } else {
      console.log(`Unexpected error: ${error.message}`);
    }
  }
}

export async function refreshTokenApiCall(token: string) {
  try {
    const res = await axios.post(`/oauth/token/client`, {
      grant_type: "refresh_token",
      client_id: process.env.NEXT_PUBLIC_BACKEND_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_BACKEND_CLIENT_SECRET,
      refresh_token: token,
    });
    return res.data;
  } catch (error: any) {
    console.error("Error refreshing access token", error.response.data);
    return error.response.data;
  }
}

export async function LoginMedia(email: string, access_token: string) {
  try {
    const res = await axios.post(`/oauth/token`, {
      username: email,
      access_token: access_token,
      grant_type: "social",
      provider: "google",
      client_id: process.env.NEXT_PUBLIC_BACKEND_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_BACKEND_CLIENT_SECRET,
    });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.log(
        `API request failed: ${error.response.status} - ${error.response.data.message}`
      );
      return error.response.data;
    } else if (error.request) {
      console.log(`API request failed: No response received`);
    } else {
      console.log(`Unexpected error: ${error.message}`);
    }
  }
}

export async function RegisterMedia(
  name: string,
  email: string,
  access_token: string
) {
  try {
    const res = await axios.post(`/oauth/token/register`, {
      name: name,
      username: email,
      access_token: access_token,
      grant_type: "social",
      provider: "google",
      client_id: process.env.NEXT_PUBLIC_BACKEND_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_BACKEND_CLIENT_SECRET,
    });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.log(
        `API request failed: ${error.response.status} - ${error.response.data.message}`
      );
      return error.response.data;
    } else if (error.request) {
      console.log(`API request failed: No response received`);
    } else {
      console.log(`Unexpected error: ${error.message}`);
    }
  }
}
