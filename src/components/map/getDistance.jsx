export const getDistance = (userLat, userLng, dropLat, dropLng, dropName, source) => {
    const lat1 = userLat
    const lon1 = userLng
    const lat2 = dropLat
    const lon2 = dropLng
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    if (source === "manual") {
        console.log(`You are ${d.toFixed(2)} meters from ${dropName}`)
    }
    if (d < 300) {
        console.log(`close enough to ${dropName}`)
    }
}