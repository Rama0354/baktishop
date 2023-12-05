import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";

export async function GET(req: NextRequest, res: NextResponse) {
  const secret = process.env.NEXTAUTH_SECRET
  const token = await getToken({ req,secret })
    try {
      const res = await axios.get(
        `${process.env.BACKEND_API}/province?page=1&per_page=40`,{
          headers:{
            'Content-Type':'Application/json',
            Authorization:`Bearer ${token?.access_token}`
          }
        }
      );
      return NextResponse.json(res.data);
      // const res = await fetch(
      //   `${process.env.BACKEND_API}/province?page=1&per_page=40`,{
      //     headers:headers()
      //   }
      // );
      // const data = await res.json()
      // return NextResponse.json(data);
    } catch (error) {
      console.error("Error while processing the request:", error);
      return NextResponse.json({ status: 500 });
    }
};