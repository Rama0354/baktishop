import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{id:string,params:string}}, res: NextResponse) {
  const id = params.id
  const allparams = params.params
  try {
      const data = await fetch(
        `${process.env.BACKEND_API}/gifts/review?search_column[10]=item_gift_id&search_text[10]=${id}&search_operator[10]==&${allparams}`,
      { cache: 'no-store' })
      const res = await data.json()
      return NextResponse.json(res);
  } catch (error) {
    console.error("Error while processing the request:", error);
    return NextResponse.json({ status: 500 });
  }
}