import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest,{params}:{params:{id:string}}, res: NextResponse) {
    const secret = process.env.NEXTAUTH_SECRET;
    const token = await getToken({ req, secret });
    const id = params.id
    try {
      if (token) {
        const res = await fetch(
          `${process.env.BACKEND_API}/carts/${id}`,
          {
            method:'DELETE',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.access_token}`,
            }
          }
          );
          const data = await res.json()
          return NextResponse.json(data);
      } else {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
    } catch (error) {
      console.error("Error while processing the request:", error);
      return NextResponse.json({ status: 500 });
    }
  }
  
export async function PUT(req: NextRequest,{params}:{params:{id:string}}, res: NextResponse) {
    const secret = process.env.NEXTAUTH_SECRET;
    const token = await getToken({ req, secret });
    const id = params.id
    const {cart_quantity} = await req.json()
    try {
      if (token) {
        const res = await fetch(
          `${process.env.BACKEND_API}/carts/${id}`,
          {
            method:'PUT',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.access_token}`,
            },
            body:JSON.stringify({cart_quantity})
          }
          );
          const data = await res.json()
          return NextResponse.json(data);
      } else {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
    } catch (error) {
      console.error("Error while processing the request:", error);
      return NextResponse.json({ status: 500 });
    }
  }