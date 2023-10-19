import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;
  try {
    const token = await getToken({ req, secret });
    if (token) {
      const res = await fetch(`${process.env.BACKEND_API}/logout`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
        method: "POST",
      });
      const data = await res.json();
      return NextResponse.json({ data });
    } else {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error while processing the request:", error);
    return NextResponse.json({ status: 500 });
  }
}
