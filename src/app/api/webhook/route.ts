import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../utils/db'

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
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
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
      console.log(session)

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
                paymentId: session.payment_intent, // 실제 결제 ID를 제공해야 합니다.
                amount: session.amount_total / 100, // 실제 결제 금액을 제공해야 합니다.
                status: 'completed', // 실제 결제 상태를 제공해야 합니다.
                createdAt: new Date(), // 현재 시간을 제공합니다.
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
