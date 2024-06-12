import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/db'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!

const webhookHandler = async (req: NextRequest) => {
  try {
    const buf = await req.text()
    const sig = req.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err)
      console.log(`❌ Error message: ${errorMessage}`)

      return NextResponse.json(
        {
          error: {
            message: `Webhook Error: ${errorMessage}`,
          },
        },
        { status: 400 },
      )
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any

      // Retrieve the checkout session to get line items
      const checkoutSession = await stripe.checkout.sessions.retrieve(
        session.id,
        {
          expand: ['line_items'],
        },
      )

      const productNames = checkoutSession.line_items?.data
        .map((lineItem) => lineItem.description)
        .join(', ')

      const paymentIntent = await stripe.paymentIntents.retrieve(
        session.payment_intent,
      )

      const latestCharge = paymentIntent.latest_charge as string

      const user = await prisma.user.findUnique({
        where: {
          email: session.customer_details.email,
        },
      })

      if (user) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            payments: {
              create: {
                id: session.payment_intent,
                paymentId: session.payment_intent,
                chargeId: latestCharge,
                amount: session.amount_total / 100,
                product: productNames,
                status: session.status === 'complete' ? 'success' : 'failed',
                createdAt: new Date(),
              },
            },
          },
        })
      }
    }

    // Successfully constructed event.
    console.log('✅ Success:', event.id)

    // Return a response to acknowledge receipt of the event.
    return NextResponse.json({ received: true })
  } catch {
    return NextResponse.json(
      {
        error: {
          message: `Method Not Allowed`,
        },
      },
      { status: 405 },
    ).headers.set('Allow', 'POST')
  }
}

export { webhookHandler as POST }
