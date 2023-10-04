import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'

export default function FriendshipBracelet(props) {
    const [ materialColor, setMaterialColor ] = useState('blue')
  const { nodes, materials } = useGLTF("./models/temp-bracelet.gltf");
    const bracelet = useRef()

    useEffect(() => {
        console.log()
        // setMaterialColor(props.user.braceletConfig.baseColor)
        setMaterialColor('#d0cece')
    }, [])

    useFrame(() => {
        bracelet.current.rotation.y += 0.01
    })
    return (<>
        <OrbitControls />
        <directionalLight />
        <pointLight 
            position={[ 0.0, -0.5, -1.0 ]}
            intensity={ 5.0 }
        />
        <ambientLight intensity={ 0.4 } />
        <group ref={ bracelet } {...props} dispose={null} scale={ 0.65 } rotation={[ -.125, 0, 0.125 ]} position={[ 0, 0.3, 0 ]}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Bracelet.geometry}
                material={nodes.Bracelet.material}
            >  
                <meshStandardMaterial 
                    color={ materialColor } 
                    metalness={ 1 }
                    roughness={ 0.2 }
                />

                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.T_Clasp.geometry}
                    material={nodes.T_Clasp.material}
                    position={[-0.144, 0.029, 0.032]}
                    rotation={[0.003, 0.005, 0.002]}
                    scale={[50.001, 50, 50]}
                >
                    <meshStandardMaterial 
                        color={ materialColor } 
                        metalness={ 1.0 }
                        roughness={ 0.2 }
                    />
                </mesh>
            </mesh>
        </group>
    </>)
}

useGLTF.preload('./models/temp-bracelet.gltf')