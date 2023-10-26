import { useEffect, useState, useRef } from "react"
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGLWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker?worker'
import 'mapbox-gl/dist/mapbox-gl.css'

import { usePosition } from './usePosition.jsx'
import { getDistance } from './getDistance.jsx'
import drops from './drops.js'

mapboxgl.workerClass = MapboxGLWorker
mapboxgl.accessToken = 'pk.eyJ1IjoianVzdGludm9sdGNyZWF0aXZlIiwiYSI6ImNrczY2eDFpYTBieXEzMGxoaDF1Nmd2aXgifQ.0HoSQyn8pH5coK4IxPRhrQ';

export default function Map() {
    const [ lat, setLat ] = useState(null)
    const [ lng, setLng ] = useState(null)
    const mapContainer = useRef(null)
    const map = useRef(null)
    const user = useRef(null)
    const watch = useRef(null)
    const [ zoom, setZoom ] = useState(15)

    const { latitude, longitude, error } = usePosition({ watch: true })

    const manualLat = useRef()
    const manualLng = useRef()

    useEffect(() =>{
        if (map.current) return; // initialize map only once
        if (latitude && longitude) {
            console.log(`map initializing at latitude ${latitude} and longitude ${longitude}`)
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/justinvoltcreative/clo625m1z007601qvgwmcegfn',
                center: [ longitude, latitude ],
                zoom: zoom,
                // Uncomment to rotate the map
                // bearing: 180,
                // pitch: 45,
                // antialias: true
            })

            const el = document.createElement('div')
            el.className = "marker"
            el.style.backgroundImage = `url(./images/bracelet-icon.png)`
            el.style.width = `50px`
            el.style.height = `50px`
            el.style.backgroundSize = `100%`

            

            user.current = new mapboxgl.Marker(el)
                .setLngLat([ longitude, latitude ])
                .addTo(map.current)
        
            drops.map((drop, index) => {
                const dropEl = document.createElement('div')
                dropEl.className = "marker"
                dropEl.style.backgroundImage = `url(./images/star-icon.png)`
                dropEl.style.width = `50px`
                dropEl.style.height = `50px`
                dropEl.style.backgroundSize = `100%`
                new mapboxgl.Marker(dropEl)
                    .setLngLat([ drop.longitude, drop.latitude ])
                    .addTo(map.current)
            })

        } else {
            console.log('map not ready yet')
        }
    }, [ latitude, longitude ])

    function manuallySetPosition() {
        if (map) {
            map.current.easeTo({ 
                center: [ manualLng.current.value, manualLat.current.value ], 
                zoom: 15,
                speed: 0.2
            })
        }
        user.current.setLngLat([ manualLng.current.value, manualLat.current.value ])
        drops.map((drop, index) => {
            getDistance(manualLat.current.value, manualLng.current.value, drop.latitude, drop.longitude, drop.name, "manual")
        })
    }

    return (<>
        <div className="flex items-center flex-col">
            <div ref={mapContainer} className="map-container mb-8" />
            <p className="mb-2">User Coordinates</p>
            <div className="flex mb-8">
                <label className="relative">
                    <div className="flex text-center bg-transparent placeholder-white outline-none  text-white items-center justify-center border-2 p-2 w-32">{ longitude ? longitude.toFixed(3) : '' }</div>
                </label>
                <label className="relative">
                    <div className="flex text-center bg-transparent placeholder-white outline-none  items-center justify-center border-2 p-2 w-32">{ latitude ? latitude.toFixed(3) : '' }</div>
                </label>
            </div>
            <p className="mb-2">Set Coordinates</p>
            <div className="flex mb-4">
                <label className="relative">
                    <input type="text" ref={ manualLng } className="flex text-center bg-transparent placeholder-white outline-none  text-white items-center justify-center border-2 p-2 w-32" placeholder={ longitude ? longitude.toFixed(3) : '' }></input>
                </label>
                <label className="relative">
                    <input type="text" ref={ manualLat } className="flex text-center bg-transparent placeholder-white outline-none  items-center justify-center border-2 p-2 w-32" placeholder={ latitude ? latitude.toFixed(3) : '' }></input>
                </label>
            </div>
            <div className="mb-8">
                <button className="flex items-center justify-center bg-white text-black border-2 border-white p-2 w-64" onClick={ manuallySetPosition }>
                    Manually Set Position
                </button>
            </div>
        </div>
    </>)
}