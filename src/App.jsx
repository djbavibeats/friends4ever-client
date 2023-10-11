import { Link, Route } from 'wouter'
import { useState, useEffect } from 'react'
// Components
// Top navigation

// Core content
import Header from './components/core/header'
import Loading from './components/core/loading'
import Intro from './components/intro/intro'
import EmailSignup from './components/emailAuth/signup'
import EmailAuth from './components/emailAuth/auth'
import Test from './components/test'

import Bracelet from './components/bracelet'

// Production
const url = 'https://friends4ever-server.onrender.com'
// Development
// const url = 'http://localhost:5000'

// Footer
function App() {
  const [ screen, setScreen ] = useState('intro')
  const [ user, setUser ] = useState(null)
  const [ missions, setMissions ] = useState(null)
  const [ authMethod, setAuthMethod ] = useState('')

  useEffect(() => {
    fetch(`${url}/database/missions/get-all-missions`)
        .then(resp => resp.json())
        .then(data => {
            setMissions(data.missions)
        })
  }, [])

  const handleScreenChange = (screen) => {
    setScreen(screen)
  }

  const handlePopulateUser = (user, authMethod) => {
    setUser(user)
    setAuthMethod(authMethod)
  }

  const handleUpdateUser = (user) => {
    setUser(user)
  }
  
  return (
    <>
      <div className="app-content h-full">
        <Header />
        { screen === 'intro' &&
        <div className="flex items-center justify-center h-[85%] max-w-lg m-auto">
          <Intro screen={ screen } handleScreenChange={ handleScreenChange } user={ user } handlePopulateUser={ handlePopulateUser } authMethod={ authMethod } missions={ missions } />
        </div>
        }
        { screen === 'email_auth' &&
        <div className="flex items-center justify-center h-[85%] max-w-lg m-auto">
          <EmailAuth handleScreenChange={ handleScreenChange } user={ user } handlePopulateUser={ handlePopulateUser } authMethod={ authMethod }  missions={ missions } />
        </div>
        }
        { screen === 'email_signup' &&
        <div className="flex items-center justify-center h-[85%] max-w-lg m-auto">
          <EmailSignup handleScreenChange={ handleScreenChange } user={ user } handlePopulateUser={ handlePopulateUser } authMethod={ authMethod }  missions={ missions } />
        </div>
        }
        { screen === 'loading' &&
          <Loading />
        }
        { screen === 'bracelet' &&
        <div className="h-[85%] max-w-lg m-auto">
          <Bracelet user={ user } handlePopulateUser={ handlePopulateUser } handleUpdateUser={ handleUpdateUser } authMethod={ authMethod } missions={ missions } />
        </div>
        }
      </div>
    </>
  )
}

export default App
