import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

export const supabaseStorage = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
)

export const stripe = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string,
  {
    apiVersion: '2023-10-16',
  },
)
