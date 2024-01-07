'use client'

import Link from 'next/link'
import { COMMON_PATH } from '@/constants/path'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import WatchCanvas from './3dCanvas/WatchWrapper'
import ShoeCanvas from './3dCanvas/ShoeCanvas'
import Model from './3dCanvas/Model'

const links = [
  {
    name: 'Men',
    href: COMMON_PATH.CATEGORY_MEN,
    modelName: 'free_avatar_for_iclone/scene',
  },
  {
    name: 'Women',
    href: COMMON_PATH.CATEGORY_WOMEN,
    modelName: 'nany_wheeler/scene',
  },
  {
    name: 'Teens',
    href: COMMON_PATH.CATEGORY_TEENS,
    modelName: 'child_scout_secret_neighbor/scene',
  },
]

export default function Hero() {
  const [modelName, setModelName] = useState<string | null>(null)

  const handleMouseEnter = (path: string) => {
    setModelName(path)
  }

  const handleMouseLeave = () => {
    setModelName(null)
  }

  return (
    <section className="mx-auto mt-8 mx-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex flex-wrap justify-between md:mb-16">
        <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
          <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">
            Top Fashion for a top price!
          </h1>
          <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
            We sell only the most exclusive and high quality products for you.
            We are the best so come and shop with us.
          </p>
        </div>

        {/* right */}
        <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
          <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
            <WatchCanvas />
          </div>

          <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
            <ShoeCanvas />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex h-12 w-64 divide-x rounded-lg border">
          {links.map((link) => (
            <div
              key={link.name}
              onMouseEnter={() => handleMouseEnter(link.modelName)}
              onMouseLeave={handleMouseLeave}
              className="relative flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
            >
              <Link key={link.name} href={link.href}>
                {link.name}
              </Link>
              {modelName === link.modelName && (
                <div className="absolute -top-full z-10">
                  <Canvas dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}>
                    <Model path={modelName} />
                    <ambientLight intensity={1} />
                    <pointLight position={[10, 10, 10]} />
                  </Canvas>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
