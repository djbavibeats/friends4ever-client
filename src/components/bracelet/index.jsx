import { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, useProgress } from '@react-three/drei'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClipboardListCheck } from "@fortawesome/pro-regular-svg-icons"

import FriendshipBracelet from './FriendshipBracelet'

function Loader() {
    const { progress } = useProgress()
    return <Html center>
        <p className="w-screen font-eurostile text-center leading-[1.8rem] tracking-[.2rem] mb-4">
            Loading ... ({progress}%)
        </p>
    </Html>
}

export default function Bracelet({ user, handlePopulateUser }) {
    const [ username, setUsername ] = useState('')
    const [ charmsCollected, setCharmsCollected ] = useState(0)

    useEffect(() => {
        console.log(user)
    }, [ user ])

    const toggleTaskModal = () => {
        console.log('open task modal')
    }

    return (<>
    <div className="h-1/6 flex items-center justify-center">
        { user && 
            <p className="font-eurostile text-center leading-[1.8rem] tracking-[.2rem] mb-4">Welcome back,<br/>{ user.display_name }</p>
        }
    </div>
        <div className="h-3/6">
            <Canvas
                camera={ { 
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [ 3, 2, 6 ]
                } }
            >
                <Suspense fallback={<Loader />}>
                    <FriendshipBracelet />
                </Suspense>
            </Canvas>
        </div>
        <div className="h-2/6 flex flex-col items-center justify-center">
            <p className="font-eurostile text-2xl text-center leading-[1.8rem] tracking-[.2rem]">{ charmsCollected } / 5</p>
            <p className="font-eurostile text-xs text-center leading-[1.8rem] tracking-[.2rem] mb-4">CHARMS COLLECTED</p>
            <button className="flex items-center justify-center border-2 border-white p-2 w-64" onClick={ toggleTaskModal }>
                VIEW AVAILABLE TASKS <FontAwesomeIcon className="ml-2" icon={ faClipboardListCheck } />
            </button>
        </div>
    </>)
}