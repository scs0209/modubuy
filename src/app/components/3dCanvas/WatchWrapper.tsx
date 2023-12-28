'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei'
import Watch from './Watch'

export default function WatchCanvas() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 25 }}>
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        shadow-mapSize={2048}
        castShadow
      />
      <OrbitControls />
      <Watch
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.25, 0]}
        scale={0.003}
      />

      <ContactShadows
        position={[0, -1.4, 0]}
        opacity={0.75}
        scale={10}
        blur={2.5}
        far={4}
      />
      <Environment preset="city" />
    </Canvas>
  )
}
