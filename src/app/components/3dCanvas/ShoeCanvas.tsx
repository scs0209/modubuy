'use client'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import Shoe from './Shoe'

export default function ShoeCanvas() {
  return (
    <Canvas
      /* @ts-ignore */
      eventSource={document.getElementById('root')}
      eventPrefix="client"
      camera={{ position: [0, 0, 4], fov: 40 }}
    >
      <OrbitControls />
      <ambientLight intensity={1} />
      <spotLight
        intensity={1}
        angle={0.1}
        penumbra={1}
        position={[10, 15, -5]}
        castShadow
      />
      <Shoe rotation={[0.3, Math.PI / 1.6, 0]} />
    </Canvas>
  )
}
