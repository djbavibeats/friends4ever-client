import { useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock, faEnvelope } from "@fortawesome/pro-regular-svg-icons"
export default function EmailAuth({ handleScreenChange }) {
    const email = useRef()
    const password = useRef()
    const [ errorMessage, setErrorMessage ] = useState(null)

    const handleEmailAuthentication = () => {
        console.log("Email: " + email.current.value)
        console.log("Password: " + password.current.value)
        if (email.current.value && password.current.value) {
            handleScreenChange('bracelet')
        } else {
            setErrorMessage('Please enter a valid email!')
        }
    }
    return (<>
        <div className="flex flex-col items-center gap-4 flex-grow p-4">
            {/* Login Text */}
            <p className="font-eurostile text-md text-center leading-[1.8rem] tracking-[.2rem]">PLEASE ENTER YOUR EMAIL AND PASSWORD.</p>
            <p className="text-center text-sm font-light">First time here? <span className="underline" onClick={ () => handleScreenChange('email_signup') }>Create an account.</span></p>
            {/* Buttons Text */}
            <label className="relative">
                <input type="text" ref={ email } className="flex bg-transparent placeholder-white outline-none  text-white items-center justify-center border-2 p-2 w-64" placeholder="EMAIL"></input>
                <FontAwesomeIcon className="ml-2 absolute top-[.8rem] right-3" icon={ faEnvelope } />
            </label>
            <label className="relative">
                <input type="password" ref={ password } className="flex bg-transparent placeholder-white outline-none  items-center justify-center border-2 p-2 w-64" placeholder="PASSWORD"></input>
                <FontAwesomeIcon className="ml-2 absolute top-[.8rem] right-3" icon={ faLock }  />
            </label>
            { errorMessage && 
                <p className="text-center text-sm font-light">
                    { errorMessage }
                </p>
            }
            <button className="flex items-center justify-center bg-white text-chasered border-2 border-white p-2 w-64" onClick={ handleEmailAuthentication }>
                ENTER
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