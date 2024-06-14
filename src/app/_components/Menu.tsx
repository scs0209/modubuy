'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { navLinks } from '@/constants'
import { MenuIcon } from 'lucide-react'

const Menu = () => {
  const [open, setOpen] = useState(false)

  return (
    <nav>
      <MenuIcon
        className="w-[28px] h-[28px] cursor-pointer opacity-60"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute bg-black text-white top-20 left-0 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-30">
          {navLinks.map((menu, i) => (
            <Link key={menu.name} href={menu.href}>
              {menu.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Menu
