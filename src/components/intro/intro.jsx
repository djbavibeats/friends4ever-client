import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/pro-regular-svg-icons"
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
export default function Intro({ screen, handleScreenChange }) {

    let headers = new Headers()
    const handleSpotifyClick = () => {
        fetch('http://localhost:5000/spotify/login', {
            mode: 'cors',
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
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