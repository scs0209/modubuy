import { useGLTF } from '@react-three/drei'

interface Props {
  path: string
}

export default function Model({ path }: Props) {
  const { scene } = useGLTF(`./${path}.gltf`)

  return <primitive object={scene} scale={2} />
}
