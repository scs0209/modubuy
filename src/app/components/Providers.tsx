'use client'

import React, { ReactNode } from 'react'
import { CartProvider as USCProvider } from 'use-shopping-cart'

export default function CartProvider({ children }: { children: ReactNode }) {
  return (
    <div>
      <USCProvider
        mode="payment"
        cartMode="client-only"
        stripe={process.env.NEXT_PUBLIC_STRIPE_KEY as string}
        successUrl="https://modubuy.vercel.app/stripe/success"
        cancelUrl="https://modubuy.vercel.app/stripe/error"
        currency="USD"
        billingAddressCollection
        shouldPersist
        language="en-US"
      >
        {children}
      </USCProvider>
    </div>
  )
}
