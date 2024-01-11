import Stripe from 'stripe'

export const clientStripe = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string,
  {
    apiVersion: '2023-10-16',
  },
)
