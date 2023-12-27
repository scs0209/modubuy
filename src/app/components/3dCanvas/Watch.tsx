import { useGLTF } from '@react-three/drei'

export default function Watch(props: any) {
  const { nodes, materials } = useGLTF('/watch-v1.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        /* @ts-ignore */
        geometry={nodes.Object005_glass_0.geometry}
        material={materials.glass}
      />
      <mesh
        castShadow
        receiveShadow
        /* @ts-ignore */
        geometry={nodes.Object006_watch_0.geometry}
        material={materials.watch}
      />
    </group>
  )
}
