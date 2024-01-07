import { NextResponse, NextRequest } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
})

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const payments = await stripe.paymentIntents.list({
      limit: 3,
    })

    return NextResponse.json(payments)
  } catch (err: any) {
    NextResponse.json({ message: err.message }, { status: 500 })
  }
}
