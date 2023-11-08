import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";

export async function GET(req: NextRequest, res: NextResponse) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });
  try {
      const res = await fetch(`${process.env.BACKEND_API}/carts`,{
        method:"GET",
        headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.access_token}`,
      }})
      const data = await res.json()
      return NextResponse.json(data);
  } catch (error) {
    console.error("Error while processing the request:", error);
    return NextResponse.json({ error,status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });
  const {item_gift_id,variant_id,cart_quantity} = await req.json()
  try {
    if (token) {
      if(variant_id !== undefined){
        const res = await fetch(
          `${process.env.BACKEND_API}/carts`,
          {
            method:'POST',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.access_token}`,
            },
            body:JSON.stringify({item_gift_id,variant_id,cart_quantity})
          }
          );
          const data = await res.json()
          return NextResponse.json(data);
      }else{
        const res = await fetch(
          `${process.env.BACKEND_API}/carts`,
          {
            method:'POST',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.access_token}`,
            },
            body:JSON.stringify({item_gift_id,cart_quantity})
          }
        );
        const data = await res.json()
        return NextResponse.json(data);
      }
    } else {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error while processing the request:", error);
    return NextResponse.json({ status: 500 });
  }
}
