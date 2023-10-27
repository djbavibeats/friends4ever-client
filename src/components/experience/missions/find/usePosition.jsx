import { useState, useEffect } from 'react'

import drops from './drops.js'
import { getDistance } from './getDistance.jsx'

export const usePosition = ( watch ) => {
    const settings = {
        enableHighAccuracy: false,
        maximumAge: Infinity,
        timeout: 5000
    }
    const [ position, setPosition ] = useState({})
    const [ error, setError ] = useState(null)

    const onChange = ({ coords, method }) => {  
        console.log('===== BEGIN CHANGE IN POSITION FUNCTION =====')
        for (var i = 0; i < drops.length; i++) {
            const distance = getDistance(coords.latitude, coords.longitude, drops[i].latitude, drops[i].longitude, drops[i].name)
            console.log(distance)
            if (distance.inRange === true) { 
                alert(`${distance.message}`)
                break
            }
        }
        setPosition({
            latitude: coords.latitude,
            longitude: coords.longitude
        })
        console.log('===== END CHANGE IN POSITION FUNCTION =====')
    }

    const onError = (error) => {
        setError(error.message)
    }

    useEffect(() => {
        const geo = navigator.geolocation
        if (!geo) {
            setError('geolocation not supported')
            return
        }

        if (watch) {
            const watcher = geo.watchPosition(onChange, onError, settings)
            return () => geo.clearWatch(watcher)
        } else {
            geo.getCurrentPosition(onChange, onError, settings)
        }
    }, [])

    return { ...position, error }
}