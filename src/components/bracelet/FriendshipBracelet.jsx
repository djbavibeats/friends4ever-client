import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

export default function FriendshipBracelet(props) {
  const { nodes, materials } = useGLTF("./models/temp-bracelet.gltf");
    const bracelet = useRef()

    useFrame(() => {
        bracelet.current.rotation.y += 0.01
    })
    return (<>
        <OrbitControls />
        <directionalLight />
        <ambientLight intensity={ 0.5 } />
        <group ref={ bracelet } {...props} dispose={null} scale={ 1.4 } rotation-x={ .125 }>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Bracelet.geometry}
                material={nodes.Bracelet.material}
            >
                <mesh
                castShadow
                receiveShadow
                geometry={nodes.T_Clasp.geometry}
                material={nodes.T_Clasp.material}
                position={[-0.144, 0.029, 0.032]}
                rotation={[0.003, 0.005, 0.002]}
                scale={[50.001, 50, 50]}
                />
            </mesh>
        </group>
    </>)
}

useGLTF.preload('./models/temp-bracelet.gltf')