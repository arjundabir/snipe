"use client"

export function fetchAndLogGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            return {latitude, longitude}
        }, error => {
            console.error('Error fetching geolocation:', error);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
};
