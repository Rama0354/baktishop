import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";

export async function GET(req: NextRequest,{params}:{params:{category:string}}, res: NextResponse) {
  const secret = process.env.NEXTAUTH_SECRET;
  const cat = params.category
  try {
    const token = await getToken({ req, secret });
    if (token) {
      const res = await axios.get(
        `${process.env.BACKEND_API}/gifts/category/${cat}`,
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
        `${process.env.BACKEND_API}/gifts/category/${cat}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return NextResponse.json(res.data);
      // return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error while processing the request:", error);
    return NextResponse.json({ status: 500 });
  }
}
