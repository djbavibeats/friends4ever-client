import { useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock, faUser, faEnvelope, faCircleX, faCircleCheck } from "@fortawesome/pro-regular-svg-icons"

export default function EmailSignup({ handleScreenChange }) {
    const email = useRef()
    const name = useRef()
    const password = useRef()
    const confirmPassword = useRef()

    const [ errorMessage, setErrorMessage ] = useState(null)
    const [ passwordMatch, setPasswordMatch ] = useState(false)

    const handleEmailSignup = () => {
        console.log("Email: " + email.current.value)
        console.log("Name: " + name.current.value)
        console.log("Password: " + password.current.value)
        console.log("Confirm Password: " + confirmPassword.current.value)
        if (email.current.value && name.current.value && password.current.value && confirmPassword.current.value) {
            if (password.current.value === confirmPassword.current.value) {
                handleScreenChange('bracelet')
            } else {
                setErrorMessage('Passwords must match!')
            }
        } else {
            setErrorMessage('Please fill out all fields!')
        }
    }

    const checkPassword = () => {
        if (password.current.value === confirmPassword.current.value) {
            setPasswordMatch(true)
        } else {
            setPasswordMatch(false)
        }
    }
    return (<>
        <div className="flex flex-col items-center gap-4 flex-grow p-4">
            {/* Login Text */}
            <p className="font-eurostile text-md text-center leading-[1.8rem] tracking-[.2rem]">NEW ACCOUNT</p>
            <p className="text-center text-sm font-light">Please enter the following information, all fields are required.</p>
            <p className="text-center text-sm font-light">Already have an account? <span className="underline" onClick={ () => handleScreenChange('email_auth') }>Login.</span></p>
            {/* Buttons Text */}
            <label className="relative">
                <input type="text" ref={ email } className="flex bg-transparent placeholder-white outline-none  text-white items-center justify-center border-2 p-2 w-64" placeholder="Email"></input>
                <FontAwesomeIcon className="ml-2 absolute top-[.8rem] right-3" icon={ faEnvelope } />
            </label>
            <label className="relative">
                <input type="text" ref={ name } className="flex bg-transparent placeholder-white outline-none  text-white items-center justify-center border-2 p-2 w-64" placeholder="Your Name"></input>
                <FontAwesomeIcon className="ml-2 absolute top-[.8rem] right-3" icon={ faUser } />
            </label>
            <label className="relative">
                <input type="password" ref={ password } className="flex bg-transparent placeholder-white outline-none  items-center justify-center border-2 p-2 w-64" placeholder="Password"></input>
                <FontAwesomeIcon className="ml-2 absolute top-[.8rem] right-3" icon={ faLock }  />
            </label>
            <label className="relative">
                <input type="password" ref={ confirmPassword } onChange={ checkPassword } className="flex bg-transparent placeholder-white outline-none  items-center justify-center border-2 p-2 w-64" placeholder="Confirm Password"></input>
                <FontAwesomeIcon className="ml-2 absolute top-[.8rem] right-3" icon={ passwordMatch === true ? faCircleCheck : faCircleX }  />
            </label>
            { errorMessage && 
                <p className="text-center text-sm font-light">
                    { errorMessage }
                </p>
            }
            <button className="flex items-center justify-center bg-white text-chasered border-2 border-white p-2 w-64" onClick={ handleEmailSignup }>
                Sign Up
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