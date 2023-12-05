import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";

export async function GET(req: NextRequest,{params}:{params:{params:string}}, res: NextResponse) {
  const allparams = params.params
  try {
      const res = await axios.get(
        `${process.env.BACKEND_API}/brand?${allparams}`
      );

      return NextResponse.json(res.data);
  } catch (error) {
    console.error("Error while processing the request:", error);
    return NextResponse.json({ status: 500 });
  }
}
