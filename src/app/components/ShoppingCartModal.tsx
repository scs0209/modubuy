'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useShoppingCart } from 'use-shopping-cart'

export default function ShoppingCartModal() {
  const { cartCount } = useShoppingCart()
  return (
    <Sheet defaultOpen>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartCount === 0 ? (
                <h1 className="py-6">You don&apos;t have any items.</h1>
              ) : (
                <h1>you have items</h1>
              )}
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
