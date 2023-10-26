import { useState, useEffect } from 'react'

import drops from './drops.js'
import { getDistance } from './getDistance.jsx'

export const usePosition = (watch) => {
    const settings = {
        enableHighAccuracy: false,
        maximumAge: Infinity,
        timeout: 5000
    }
    const [ position, setPosition ] = useState({})
    const [ error, setError ] = useState(null)

    const onChange = ({ coords }) => {
        drops.map(drop => {
            getDistance(coords.latitude, coords.longitude, drop.latitude, drop.longitude, drop.name, "auto")
        })
        setPosition({
            latitude: coords.latitude,
            longitude: coords.longitude
        })
    }

    const onError = (error) => {
        setError(error.message)
    }

    useEffect(() => {
        const geo = navigator.geolocation
        console.log('update settings')
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