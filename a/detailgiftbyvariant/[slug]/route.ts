import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";

export const dynamic = 'auto';
export async function GET(req: NextRequest,{params}:{params:{slug:string}}, res: NextResponse) {
  const secret = process.env.NEXTAUTH_SECRET;
  const slug = params.slug
  try {
    const token = await getToken({ req, secret });
    if (token) {
      const res = await axios.get(
        `${process.env.BACKEND_API}/variants/slug/${slug}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );
      return NextResponse.json(res.data);
    } else {
      const res = await axios.get(
        `${process.env.BACKEND_API}/variants/slug/${slug}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return NextResponse.json(res.data);
    }
  } catch (error) {
    console.error("Error while processing the request:", error);
    return NextResponse.json({ status: 500 });
  }
}