'use client'

import React, { ReactNode } from 'react'
import { CartProvider as USCProvider } from 'use-shopping-cart'
import { backUrl } from '../config/url'

export default function CartProvider({ children }: { children: ReactNode }) {
  return (
    <div>
      <USCProvider
        mode="payment"
        cartMode="client-only"
        stripe={process.env.NEXT_PUBLIC_STRIPE_KEY as string}
        successUrl={`${backUrl}/stripe/success`}
        cancelUrl={`${backUrl}/stripe/error`}
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
