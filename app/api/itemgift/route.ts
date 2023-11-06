import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";

export async function GET(req: NextRequest, res: NextResponse) {
  const secret = process.env.NEXTAUTH_SECRET;
  try {
    const token = await getToken({ req, secret });
    if (token) {
      const res = await fetch(`${process.env.BACKEND_API}/gifts`,{cache:"no-store",headers:{
        "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token}`,
      }})
      const data = await res.json()
      return NextResponse.json(data);
    } else {
      const res = await axios.get(
        `${process.env.BACKEND_API}/gifts`,
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
    return NextResponse.json({ error,status: 500 });
  }
}
