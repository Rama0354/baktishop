import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{id:string}}, res: NextResponse) {
  const id = params.id
  try {
      const data = await fetch(
        `${process.env.BACKEND_API}/gifts/review?per_page=1&search_column[10]=item_gift_id&search_text[10]=${id}&search_operator[10]==`,
      { cache: 'no-store' })
      const res = await data.json()
      return NextResponse.json(res);
  } catch (error) {
    console.error("Error while processing the request:", error);
    return NextResponse.json({ status: 500 });
  }
}