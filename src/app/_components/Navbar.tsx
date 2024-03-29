'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, ShoppingBag } from 'lucide-react'
import { useShoppingCart } from 'use-shopping-cart'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { COMMON_PATH } from '@/constants/path'
import UserDropdownMenu from './DropDown'
import { backUrl } from '../_config/url'
import SearchForm from './SearchForm'

const links = [
  { name: 'Home', href: `${COMMON_PATH.HOME}` },
  { name: 'Men', href: `${COMMON_PATH.CATEGORY_MEN}` },
  { name: 'Women', href: `${COMMON_PATH.CATEGORY_WOMEN}` },
  { name: 'Teens', href: `${COMMON_PATH.CATEGORY_TEENS}` },
]

export default function Navbar() {
  const pathname = usePathname()
  const { handleCartClick } = useShoppingCart()
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (session) {
      const fetchPayments = async (userId: string) => {
        try {
          const response = await fetch(
            `${backUrl}/api/payment?userId=${userId}`,
          )
          const paymentIds = await response.json()

          paymentIds.forEach(async (paymentId: string) => {
            // 두 번째 호출: Stripe 결제 정보 불러오기
            const result = await fetch(`${backUrl}/api/payment/${paymentId}`)
            const paymentInfo = await result.json()
          })
        } catch (error) {
          console.error(error)
        }
      }

      fetchPayments(session?.user.id)
    }
  }, [session])

  if (pathname.startsWith('/admin')) return null

  return (
    <>
      <header className="border-b">
        <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
          <Link href="/" className="flex items-center justify-center">
            <Image src="/logo.png" alt="Logo" width={45} height={45} />
            <h1 className="text-2xl md:text-4xl font-bold">
              Modu<span className="text-primary">Buy</span>
            </h1>
          </Link>

          <nav className="hidden gap-12 lg:flex 2xl:ml-16">
            {links.map((link, idx) => (
              <div key={idx}>
                {pathname === link.href ? (
                  <Link
                    className="text-lg font-semibold text-primary"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <Link
                    href={link.href}
                    className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="flex divide-x border-r sm:border-l">
            <Button
              variant="outline"
              onClick={() => handleCartClick()}
              className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none"
            >
              <ShoppingBag />
              <span className="hidden text-xs font-semibold text-gray-500 sm:block">
                Cart
              </span>
            </Button>
            <UserDropdownMenu session={session} />
            <Button
              variant="outline"
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none"
            >
              <Search />
              <span className="hidden text-xs font-semibold text-gray-500 sm:block">
                Search
              </span>
            </Button>
          </div>
        </div>
      </header>
      {isOpen && <SearchForm />}
    </>
  )
}
