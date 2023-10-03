import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/pro-regular-svg-icons"
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { useState, useEffect } from 'react'

const getTokenFromUrl = () => {
        if (window.location.href.includes('?')) {
            return window.location.href
                .split('?')[1]
                .split('&')
                .reduce((initial, item) => {
                    let parts = item.split('=')
                    initial[parts[0]] = decodeURIComponent(parts[1])
                    return initial
            }, {})
        }
    // }
}

export default function Intro({ screen, handleScreenChange, user, handlePopulateUser }) {
    const [ spotifyToken, setSpotifyToken ] = useState("")
    const [ loggedIn, setLoggedIn ] = useState(false)

    // Production
    const url = 'https://friends4ever-server.onrender.com'
    // Development
    // const url = 'http://localhost:5000'

    useEffect(() => {
        const spotifyToken = getTokenFromUrl()
        var access_token = ''
        var token_type = ''
        if (localStorage.getItem('spotify_refresh')) {
            console.log('yes!')
            const refresh_token = localStorage.getItem('spotify_refresh')
            fetch(`${url}/spotify/refresh?refresh_token=${refresh_token}`)
                .then(resp => resp.json())
                .then(data => {
                    console.log('Welcome back, successful fetch!', data)
                    access_token = data.data.access_token
                    token_type = data.data.token_type
                    fetch(`${url}/spotify/get-user?access_token=${access_token}&token_type=${token_type}`)
                        .then(resp => resp.json())
                        .then(data => {
                            console.log('Found the user', data)
                            handlePopulateUser(data.data)
                            handleScreenChange('bracelet')
                        })
                })
        } else {
            if (spotifyToken && !loggedIn) {
                setSpotifyToken(spotifyToken)
                // use spotify api
                setLoggedIn(true)
                fetch(`${url}/spotify/callback?code=${spotifyToken.code}&state=${spotifyToken.state}`)
                    .then(resp => resp.json())
                    .then(data => {
                        console.log('Successful fetch!', data)
                        if (data.status === 200) {
                            localStorage.setItem('spotify_refresh', data.data.refresh_token)
                            access_token = data.data.access_token
                            token_type = data.data.token_type
                            fetch(`${url}/spotify/get-user?access_token=${access_token}&token_type=${token_type}`)
                                .then(resp => resp.json())
                                .then(data => {
                                    console.log('Found the user', data)
                                    handlePopulateUser(data.data)
                                    handleScreenChange('bracelet')
                                })
                            handleScreenChange('bracelet')
                        } else {
                            console.log('hold on...')
                        }
                    })
            }
        }

    }, [])

    const handleSpotifyClick = () => {
        window.open(`${url}/spotify/login`, '_self')
    }

    const handleEmailClick = () => {
        handleScreenChange('email_auth')
    }

    return (<>
        <div className="flex flex-col items-center p-4 gap-4 flex-grow">
            {/* Login Text */}
            <p className="font-eurostile text-md text-center leading-[1.8rem] tracking-[.2rem]">LOGIN TO VIEW YOUR FRIENDSHIP BRACELET</p>
            {/* Buttons Text */}
            <button className="flex items-center justify-center border-2 border-white p-2 w-64" onClick={ handleSpotifyClick }>
                LOGIN WITH SPOTIFY <FontAwesomeIcon className="ml-2" icon={ faSpotify } />
            </button>
            <button className="flex items-center justify-center border-2 border-white p-2 w-64" onClick={ handleEmailClick }>
                LOGIN WITH EMAIL <FontAwesomeIcon className="ml-2" icon={ faEnvelope }  />
            </button>
            {/* Terms & Conditions Text */}
            <p className="text-center text-[10px] font-light">
                By connecting, you agree to the Terms & Conditions and Privacy Policy 
                and you agree to receive email communication from Chase Atlantic and Fearless Records. 
                For more information on how we use your data, please click here.
            </p>
        </div>
    </>)
}