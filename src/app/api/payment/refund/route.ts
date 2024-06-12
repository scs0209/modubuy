import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import prisma from '../../../../lib/db'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
})

export async function POST(req: NextRequest) {
  const url = new URL(req.url!)
  const chargeId = url.searchParams.get('chargeId')!
  const paymentId = url.searchParams.get('paymentId')!

  try {
    const refund = await stripe.refunds.create({ charge: chargeId })

    if (refund.status === 'succeeded') {
      await prisma.payment.update({
        where: { id: paymentId },
        data: { status: 'refunded' },
      })
    }

    return NextResponse.json(refund)
  } catch (err: any) {
    NextResponse.json({ statusCode: 500, message: err.message })
  }
}
