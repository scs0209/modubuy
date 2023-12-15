import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
})

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse,
  { params }: { params: { paymentId: string } },
) {
  const { paymentId } = params

  try {
    const payments = await stripe.paymentIntents.retrieve(paymentId)

    return NextResponse.json(payments)
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
