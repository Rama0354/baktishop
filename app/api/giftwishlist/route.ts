import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";
import { headers } from "next/headers";

export async function GET(req: NextRequest, res: NextResponse) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });
  try {
      const res = await axios.get(`${process.env.BACKEND_API}/gifts/wishlist`,{
        headers:{
        "Content-Type": "application/json",
            Authorization: `Bearer ${token?.access_token}`,
      }})
      return NextResponse.json(res.data);
      // const res = await fetch(
      //   `${process.env.BACKEND_API}/gifts/wishlist`,{
      //     headers:headers()
      //   }
      // );
      // const data = await res.json()
      // return NextResponse.json(data);
  } catch (error) {
    console.error("Error while processing the request:", error);
    return NextResponse.json({ error,status: 500 });
  }
}
