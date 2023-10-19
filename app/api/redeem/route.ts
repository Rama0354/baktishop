import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt';

export async function POST(req: NextRequest, res: NextResponse) {
    const searchparams = req.nextUrl.searchParams
    const id = searchparams.get('id')
    const qty = searchparams.get('qty')
    const secret = process.env.NEXTAUTH_SECRET
    try {
        const token = await getToken({ req,secret });
        if (token) {
            const gifts = await fetch(`${process.env.BACKEND_API}/gifts/${id}/redeem`, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`,
                },
                body:JSON.stringify({
                    redeem_quantity:qty
                })
            })
            const data = await gifts.json()
            return NextResponse.json({ data })
        } else {
            return NextResponse.json({message:'Unauthorized'},{status:401})
        }
    } catch (error) {
        console.error("Error while processing the request:", error);
        return NextResponse.json({status:500})
    }
}