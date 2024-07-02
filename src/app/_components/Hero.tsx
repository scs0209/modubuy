'use client'

import Link from 'next/link'
import { COMMON_PATH } from '@/constants/path'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import { motion } from 'framer-motion'
import WatchCanvas from './3dCanvas/WatchWrapper'
import ShoeCanvas from './3dCanvas/ShoeCanvas'
import Model from './3dCanvas/Model'
import { fadeIn } from '../_utils/variant'

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
    <section className="mx-auto mt-8">
      <div className="flex flex-wrap justify-between mb-8 md:mb-16">
        <motion.div
          variants={fadeIn('right', 0.6)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex flex-col justify-center w-full mb-6 sm:mb-12 lg:mb-0 lg:w-1/2 lg:pb-24 lg:pt-48"
        >
          <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">
            Top Fashion for a top price!
          </h1>
          <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
            We sell only the most exclusive and high quality products for you.
            We are the best so come and shop with us.
          </p>
        </motion.div>

        {/* right */}
        <motion.div
          variants={fadeIn('left', 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex w-full mb-12 md:mb-16 lg:w-1/2"
        >
          <div className="relative z-10 -ml-12 overflow-hidden bg-gray-100 rounded-lg shadow-lg left-12 top-12 md:left-16 md:top-16 lg:ml-0">
            <WatchCanvas />
          </div>

          <div className="overflow-hidden bg-gray-100 rounded-lg shadow-lg">
            <ShoeCanvas />
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <motion.div
          variants={fadeIn('up', 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex w-64 h-12 border divide-x rounded-lg"
        >
          {links.map((link) => (
            <div
              key={link.name}
              onMouseEnter={() => handleMouseEnter(link.modelName)}
              onMouseLeave={handleMouseLeave}
              className="relative flex items-center justify-center w-1/3 text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
            >
              <Link key={link.name} href={link.href}>
                {link.name}
              </Link>
              {modelName === link.modelName && (
                <motion.div
                  variants={fadeIn('down', 0.5)}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="absolute z-10 -top-full"
                >
                  <Canvas dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}>
                    <Model path={modelName} />
                    <ambientLight intensity={1} />
                    <pointLight position={[10, 10, 10]} />
                  </Canvas>
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
