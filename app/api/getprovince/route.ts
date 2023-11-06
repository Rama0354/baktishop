import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
import axios from "axios";
import { headers } from "next/headers"

export async function GET(req: NextRequest, res: NextResponse) {
  // const secret = process.env.NEXTAUTH_SECRET;
  // const token = await getToken({ req, secret });
    try {
      const res = await fetch(
        `${process.env.BACKEND_API}/province?page=1&per_page=40`,
        {
          method:'GET',
          headers: headers()
        }
      );
      const data = await res.json()
  
      return NextResponse.json(data);
    } catch (error) {
      console.error("Error while processing the request:", error);
      return NextResponse.json({ status: 500 });
    }
};