import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";

export async function GET(req: NextRequest,{params}:{params:{id:number}}, res: NextResponse) {
  const secret = process.env.NEXTAUTH_SECRET;
  const id = params.id

  try {
    const token = await getToken({ req, secret });
    if (token) {
      const res = await axios.get(
        `${process.env.BACKEND_API}/city?page=1&per_page=10&search_column[0]=province_id&search_text[0]=${id}&search_operator[0]=like&sort_column[0]=city_name&sort_type[0]=asc`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );

      return NextResponse.json(res.data);
    }
  } catch (error) {
    console.error("Error while processing the request:", error);
    return NextResponse.json({ status: 500 });
  }
};