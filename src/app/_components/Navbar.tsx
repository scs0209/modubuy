'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useShoppingCart } from 'use-shopping-cart'
import { Search, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import UserDropdownMenu from './DropDown'
import SearchForm from './SearchForm'
import Menu from './Menu'
import { backUrl } from '../_config/url'
import { navLinks } from '@/constants'

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
    <header className="relative h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* mobile */}
      <div className="flex items-center justify-between h-full md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={45} height={45} />
          <h1 className="text-2xl font-bold tracking-wide md:text-4xl">
            Modu<span className="text-primary">Buy</span>
          </h1>
        </Link>
        <Menu />
      </div>

      {/* BIGGER */}
      <div className="items-center justify-between hidden h-full gap-8 md:flex">
        {/* LEFT */}
        <nav className="flex items-center w-1/3 gap-12 xl:w-1/2">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="logo" width={24} height={24} />
            <h1 className="text-2xl font-bold tracking-wide">
              Modu<span className="text-primary">Buy</span>
            </h1>
          </Link>
          <div className="hidden gap-4 xl:flex">
            {navLinks.slice(0, 5).map((menu, i) => (
              <Link key={menu.name} href={menu.href}>
                {menu.name}
              </Link>
            ))}
          </div>
        </nav>
        {/* RIGHT */}
        <div className="flex items-center justify-between w-2/3 gap-8">
          <SearchForm />
          <div className="relative flex items-center gap-4 xl:gap-6">
            <ShoppingBag
              className="w-[22px] h-[22px] cursor-pointer"
              onClick={() => handleCartClick()}
            />
            <UserDropdownMenu session={session} />
          </div>
        </div>
      </div>
    </header>
  )
}
