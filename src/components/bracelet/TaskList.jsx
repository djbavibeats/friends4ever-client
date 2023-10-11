import { faLock } from "@fortawesome/pro-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

// Production
const url = 'https://friends4ever-server.onrender.com'
// Development
// const url = 'http://localhost:5000'

const Mission = ({ mission, user, handleUpdateUser, followMission, listenMission }) => {
    const [ missionDetails, setMissionDetails ] = useState(null)

    function executemission(name) {
        switch (name) {
            case ('follow'):
                followMission(user, mission)
                break
            case ('listen'):
                listenMission(user, mission)
                break
            default:
                console.log('default...')
                break
        }
    }

    useEffect(() => {
        if (user.missions.find(umission => umission.missionId === mission._id)) {
            setMissionDetails(user.missions.find(umission => umission.missionId === mission._id))
        }
    }, [ user ])

    return (<>
        <div className={`grid py-2 grid-cols-4 relative mb-4`}>
            { !mission.available &&
                <div className="absolute flex flex-col items-center justify-center m-auto z-20 h-full w-full">
                    <FontAwesomeIcon className="text-2xl mb-3" icon={ faLock }  />
                    <p className="font-eurostile text-xs">MISSION LOCKED</p>
                </div>
            }
            <div className={ mission.available ?
                `col-span-1`
                : `blur-sm col-span-1`
            }>
                <div className="flex pr-2 h-full w-full items-center justify-center">
                    <img src={'./images/bracelet-icon.png' } />
                </div>
            </div>
            <div className={ mission.available ?
                `relative col-span-3`
                : `relative col-span-3 blur-[8px]`
            }>
                { missionDetails &&
                    missionDetails.completed && 
                    mission.available && 
                    <div className="absolute h-full w-full flex items-center pl-5">
                        <p className="font-eurostile text-xs text-[rgba(0,255,0,1)]">MISSION COMPLETE</p>
                    </div>
                } 
                <div className={ missionDetails && missionDetails.completed && mission.available ? `blur-[8px]` : `` }
                >
                <p className="font-eurostile uppercase">{ mission.name }</p>
                <p className="font-eurostile text-[9px] uppercase pt-2 mb-4">{ mission.description }</p>
                <div onClick={ () => executemission(mission.name) } className="w-40 border-2 border-white py-1 px-1 rounded-full bg-[rgba(0,0,0,0.075)] hover:cursor-pointer">
                    <p className="font-eurostile text-[9px] text-center">START MISSION</p>
                </div>
                </div>
            </div>

        </div>  
    </>)
}

export default function TaskList({ user, missions, toggleMissionsModal, handleUpdateUser }) {
    function followMission(user, mission) {
        if (user.authMethod === "spotify") {
                // Follow Chase Atlantic
                fetch(`${url}/spotify/follow-chase-atlantic`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        spotifyId: user.spotifyId,
                        spotifyRefreshToken: user.spotifyRefreshToken 
                    })
                })
                    .then(resp => resp.json())
                    .then(data => {
                        if (data.status === 200) {
                            console.log('Chase Atlantic Followed!')
                            // Save Mamacita on Spotify
                            fetch(`${url}/spotify/save-mamacita`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    spotifyId: user.spotifyId,
                                    spotifyRefreshToken: user.spotifyRefreshToken
                                })
                            })
                                .then(resp => resp.json())
                                .then(data => {
                                    if (data.status === 200) {
                                        console.log('Mamacita saved!')
                                        fetch(`${url}/database/missions/update-mission-finishers`, {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    missionId: mission._id,
                                                    userId: user._id,
                                                })
                                            })
                                                .then(response => response.json())
                                                .then(data => {
                                                    console.log(data.message)
                                                    fetch(`${url}/database/users/get-by-id?user_id=${localStorage.getItem('dbv_id')}`)
                                                        .then(resp => resp.json())
                                                        .then(data => {
                                                            handleUpdateUser(data.user)
                                                        })
                                                })
                                    } else {
                                        console.log('Error saving Mamacita')
                                    }
                                    console.log(data)
                                })
                        } else {
                            console.log('Error following Chase Atlantic')
                        }
                    })
            } else {
                console.log("user did not authenticate with spotify")
            }
    }

    function listenMission(user, mission) {
        console.log('listen up!')
        if (user.authMethod === "spotify") {
            // Play Mamacita
            fetch(`${url}/spotify/play-mamacita`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    spotifyId: user.spotifyId,
                    spotifyRefreshToken: user.spotifyRefreshToken 
                })
            })
        } else {
            console.log('user did not authenticate with spotify')
        }  
    }

    return (<>
        <div className="flex items-center absolute top-0 left-0 h-full w-screen p-1 bg-[rgba(0,0,0,0.25)] z-20 overflow-hidden">
            <div className="bg-black text-white p-2 modal-container w-[98%] max-w-[500px] min-w-[330px] m-auto overflow-scroll h-[98%]">
                <div className="relative task-list-modal pt-14 border-2 border-color-white h-full">
                    <div className="absolute top-3 right-3 text-xs border-2 border-white rounded-full px-[6px] py-1 font-bold bg-[rgba(0,0,0,0.25)] hover:cursor-pointer" onClick={ toggleMissionsModal }>
                        <div className="font-eurostile">X</div>
                    </div>
                    <p className="font-eurostile text-center text-2xl leading-[1.8rem] tracking-[.2rem] mb-0">MISSIONS</p>
                    <div className="h-[2px] w-[90%] m-auto bg-black mb-4"></div>            
                    <div className="px-2">
                        { missions.map((mission, index) => {
                            return <Mission 
                            key={ index } 
                            user={ user } 
                            mission={ mission } 
                            handleUpdateUser={ handleUpdateUser } 
                            followMission={ followMission } 
                            listenMission={ listenMission }
                        />
                        })}
                    </div>    
                    <div className="h-[2px] w-[90%] m-auto bg-black mb-4"></div> 
                </div>
            </div>
        </div>
    </>)
}   