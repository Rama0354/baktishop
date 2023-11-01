import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";

export async function GET(req:NextRequest,{params}:{params:{id:string}}, res: NextResponse) {
  const p = params.id
  try {
      const data = await fetch(
        `${process.env.BACKEND_API}/gifts/review?page=1&per_page=15&search_column[0]=item_gift_id&search_text[0]=${p}&search_operator[0]==&sort_column[0]=review_date&sort_type[0]=desc`,
      { cache: 'no-store' })
      const res = await data.json()
      return NextResponse.json(res);
  } catch (error) {
    console.error("Error while processing the request:", error);
    return NextResponse.json({ status: 500 });
  }
}