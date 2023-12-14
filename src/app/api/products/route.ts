import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
})

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const payments = await stripe.paymentIntents.list({
      limit: 3,
    })

    return NextResponse.json(payments)
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
