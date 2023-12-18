import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
})

export async function GET(
  req: NextRequest,
  { params }: { params: { paymentId: string } },
) {
  const { paymentId } = params

  try {
    const payments = await stripe.paymentIntents.retrieve(paymentId)

    return NextResponse.json(payments)
  } catch (err: any) {
    NextResponse.json({ statusCode: 500, message: err.message })
  }
}
