import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest, res: NextResponse) {
  const secret = process.env.NEXTAUTH_SECRET;
  try {
    const token = await getToken({ req, secret });
    if (token) {
      return NextResponse.json({token:token});
    }else{
        return NextResponse.json({status:401});
    }
  } catch (error) {
    console.error("Error while processing the request:", error);
    return NextResponse.json({ status: 500 });
  }
}
