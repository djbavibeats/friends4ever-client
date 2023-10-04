import { useState, useEffect, useRef, Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Html, useProgress, Environment } from '@react-three/drei'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClipboardListCheck } from "@fortawesome/pro-regular-svg-icons"

import FriendshipBracelet from './FriendshipBracelet'
import TaskList from './TaskList.jsx'

function Loader() {
    const { progress } = useProgress()
    return <Html center>
        <p className="w-screen font-eurostile text-center leading-[1.8rem] tracking-[.2rem] mb-4">
            Loading ... ({progress}%)
        </p>
    </Html>
}

export default function Bracelet({ user, handlePopulateUser, authMethod }) {
    const [ username, setUsername ] = useState('')
    const [ taskListVisible, setTaskListVisible ] = useState(false)
    const [ charmsCollected, setCharmsCollected ] = useState(0)
    const canvas = useRef()

    useEffect(() => {
        console.log(user)
        console.log(authMethod)

        setCharmsCollected(user.charms.filter((charm) => charm.completed === true).length)
    }, [ user ])

    const toggleTaskModal = () => {
        console.log('open task modal')
        setTaskListVisible(!taskListVisible)
    }

    return (<>
    <div className="h-1/6 pt-8 px-8 flex items-center justify-center relative z-10">
        { user && 
            <p className="font-eurostile text-center leading-[1.8rem] tracking-[.2rem] mb-4">Welcome back,<br/>{ user.displayName }</p>
        }
    </div>
        {/* Spacer */}
        <div className="h-3/6"></div>
        <div className="w-screen absolute h-screen top-0 left-0">
            <Canvas
                ref={ canvas }
                id="canvas-wrapper-id"
                gl={{ preserveDrawingBuffer: true }}
                camera={ { 
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [ 0, 2, - 6 ]
                } }
            >
                <Suspense fallback={<Loader />}>
                    <FriendshipBracelet user={ user } />
                </Suspense>
                <Environment 
                    preset="city"
                >
                </Environment>
            </Canvas>
        </div>
        <div className="h-2/6 flex flex-col items-center justify-center relative z-10 p-8">
            <p className="font-eurostile text-2xl text-center leading-[1.8rem] tracking-[.2rem]">{ charmsCollected } / 5</p>
            <p className="font-eurostile text-xs text-center leading-[1.8rem] tracking-[.2rem] mb-4">CHARMS COLLECTED</p>
            <button className="flex items-center justify-center border-2 border-white p-2 w-64 hover:cursor-pointer" onClick={ toggleTaskModal }>
                VIEW AVAILABLE TASKS <FontAwesomeIcon className="ml-2" icon={ faClipboardListCheck } />
            </button>
        </div>
        { taskListVisible &&
            <TaskList visible={ taskListVisible } user={ user } toggleTaskModal={ toggleTaskModal } />
        }
    </>)
}