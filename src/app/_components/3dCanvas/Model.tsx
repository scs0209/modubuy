import { SpotLight, useDepthBuffer, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Vector3 } from 'three'

interface Props {
  path: string
}

function MovingSpot({ vec = new Vector3(), ...props }) {
  const light = useRef<any>()
  const viewport = useThree((state) => state.viewport)
  useFrame((state) => {
    light.current.target.position.lerp(
      vec.set(
        (state.mouse.x * viewport.width) / 2,
        (state.mouse.y * viewport.height) / 2,
        0,
      ),
      0.1,
    )
    light.current.target.updateMatrixWorld()
  })
  return (
    <SpotLight
      castShadow
      ref={light}
      penumbra={1}
      distance={6}
      angle={0.35}
      attenuation={5}
      anglePower={4}
      intensity={2}
      {...props}
    />
  )
}

export default function Model({ path }: Props) {
  const { scene, nodes } = useGLTF(`./${path}.gltf`)
  const depthBuffer = useDepthBuffer({ frames: 1 })

  return (
    <>
      <MovingSpot
        depthBuffer={depthBuffer}
        color="yellow"
        position={[0, 3, 0]}
      />
      <primitive object={scene} scale={2} />
    </>
  )
}
