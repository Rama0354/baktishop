import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest, res: NextResponse) {
  const searchparams = req.nextUrl.searchParams;
  const id = searchparams.get("id");
  const secret = process.env.NEXTAUTH_SECRET;
  try {
    const token = await getToken({ req, secret });
    if (token) {
      const gifts = await fetch(
        `${process.env.BACKEND_API}/gifts/${id}/wishlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );
      const data = await gifts.json();
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error while processing the request:", error);
    return NextResponse.json({ status: 500 });
  }
}
