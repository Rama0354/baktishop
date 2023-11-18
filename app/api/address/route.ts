import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const secret = process.env.NEXTAUTH_SECRET;
    const token = await getToken({ req, secret });
    const {user_id,address_id} = await req.json()
    try {
      if (token) {
        const res = await fetch(
          `${process.env.BACKEND_API}/users/set-main-address`,
          {
            method:'POST',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.access_token}`,
            },
            body:JSON.stringify({user_id,address_id})
          }
          );
          const data = await res.json()
          return NextResponse.json(data);
      } else {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
    } catch (error) {
      console.error("Error while processing the request:", error);
      return NextResponse.json({ status: 500 });
    }
  }