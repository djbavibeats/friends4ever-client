import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'

import TestBracelet from './TestBracelet'

export default function Test() {
    return (<>
        <Canvas
            id="canvas-wrapper-id2"
            camera={ { 
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ 0, 2, - 6 ]
            } }
        >
                {/* <FriendshipBracelet user={ user } /> */}
            <TestBracelet />
            {/* <Environment 
                preset="night"
            >
            </Environment> */}
        </Canvas>
    </>)
}