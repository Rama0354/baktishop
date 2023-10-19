import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";

export async function GET(req: NextRequest, res: NextResponse) {
  const secret = process.env.NEXTAUTH_SECRET;
  const searchparams = req.nextUrl.searchParams.toString();
  const brand = searchparams.split('.')[0]
  const filters = searchparams.split('.')[1]
  try {
    const token = await getToken({ req, secret });
    if (token) {
      const res = await axios.get(
        `${process.env.BACKEND_API}/gifts/brand/${brand}?${filters === '=' ? '' : filters}`,
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
        `${process.env.BACKEND_API}/gifts/brand/${brand}?${filters === '=' ? '' : filters}`,
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
