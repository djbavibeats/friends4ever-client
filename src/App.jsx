import { Link, Route } from 'wouter'
import { useState } from 'react'
// Components
// Top navigation

// Core content
import Header from './components/core/header'
import Loading from './components/core/loading'
import Intro from './components/intro/intro'
import EmailSignup from './components/emailAuth/signup'
import EmailAuth from './components/emailAuth/auth'

import Bracelet from './components/bracelet'

// Footer
function App() {
  const [ screen, setScreen ] = useState('intro')

  const handleScreenChange = (screen) => {
    setScreen(screen)
  }
  return (
    <>
      <div className="app-content h-full">
        <Header />
        { screen === 'intro' &&
        <div className="flex items-center justify-center h-[95%] max-w-lg m-auto">
          <Intro screen={ screen } handleScreenChange={ handleScreenChange } />
        </div>
        }
        { screen === 'email_auth' &&
        <div className="flex items-center justify-center h-[95%] max-w-lg m-auto">
          <EmailAuth handleScreenChange={ handleScreenChange } />
        </div>
        }
        { screen === 'email_signup' &&
        <div className="flex items-center justify-center h-[95%] max-w-lg m-auto">
          <EmailSignup handleScreenChange={ handleScreenChange } />
        </div>
        }
        { screen === 'loading' &&
          <Loading />
        }
        { screen === 'bracelet' &&
        <div className="h-[90%] max-w-lg m-auto">
          <Bracelet />
        </div>
        }
      </div>
    </>
  )
}

export default App
