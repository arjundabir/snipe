"use client"

import React, { useEffect, useState, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import Leaderboard from './Leaderboard';
import Alerts from './Alerts';
import { run } from '../randland/gemini';
import Link from 'next/link';


const loader = new Loader({
  apiKey: "AIzaSyAyIr3ZBmZUMAi9kZML91y3JlLc8sFYmPw",
  version: "weekly",
  libraries: ["places"]
});

const mapOptions = {
  center: { lat: 34.0699, lng: -118.4438 },
  zoom: 16,
};

const landmarks = {
  bruinStatue: {
    center: { lat: 34.0709621, lng: -118.4449902 },
  },
  royceHall: {
    center: { lat: 34.0728552, lng: -118.4421766 },
  },
  powellLibrary: {
    center: { lat: 34.0716399, lng: -118.4421766 },
  },
  invertedFountain: {
    center: { lat: 34.07007650000001, lng: -118.4407628 },
  },
  pauleyPavilion: {
    center: { lat: 34.0703423, lng: -118.4469294 },
  },
  sculptureGarden: {
    center: { lat: 34.0751, lng: -118.4400333 },
  },
  janssSteps: {
    center: { lat: 34.0721929, lng: -118.443168 },
  },
  murphyHall: {
    center: { lat: 34.0716251, lng: -118.4387327 },
  },
};


interface Position{
  lat: number;
  lng: number;

}

function getDistanceFromLatLonInM(lat1: number, lon1: number, lat2: number, lon2: number): number {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d * 1000; // Distance in m
}

function deg2rad(deg: number): number {
  return deg * (Math.PI/180)
}

function isWithinRadius(playerPos: Position, locationCenter: Position): boolean {
  const distance = getDistanceFromLatLonInM(playerPos.lat, playerPos.lng, locationCenter.lat, locationCenter.lng);
  return distance <= 100;
}

function MapDisplay() {
    const mapContainerRef = useRef(null);
    const [geminiResult, setGeminiResult] = useState(); // State to store the result from run()
    const [riddle, setRiddle] = useState(null); // State to store the riddle from run()
    const [win, setWin] = useState(false);

    function getRandomArbitrary(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    function handleClick(){
      setWin(false)
      window.location.reload()
    }

    function camelCaseToTitleCase(camelCaseString: string) {
      // Check if the input is a valid string
      if (typeof camelCaseString !== 'string') {
          console.error('Invalid input: expected a string');
          return ''; // Return an empty string or any other default value
      }
  
      // Add a space before each uppercase letter
      const spacedString = camelCaseString.replace(/([A-Z])/g, (match, offset) => {
          return offset === 0 ? match : ' ' + match;
      });
  
      // Split the string into words and capitalize the first letter of each word
      return spacedString.split(' ').map(word => {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }).join(' ');
  }
  
    // Effect for running the gemini function
    useEffect(() => {
      run()
        .then(result => {
          const parsed_result = JSON.parse(result);
          const riddle = parsed_result.riddle;
          const landmark = parsed_result.landmark;
          setGeminiResult(landmark)
          setRiddle(riddle)
        })
    }, []); // Empty dependency array ensures this runs only once on mount
  
    
    // Effect for loading the map and adding circles
    useEffect(() => {
      // @ts-ignore
      let marker = null;
      // @ts-ignore
      let watchId = null;
        loader.load().then(() => {
          console.log("Gemini result:", geminiResult);
          if (mapContainerRef.current && geminiResult && landmarks[geminiResult]) {
            const map = new google.maps.Map(mapContainerRef.current, mapOptions);
            const adjustedCenter = {
              // @ts-ignore
              lat: landmarks[geminiResult].center.lat + getRandomArbitrary(-0.0008, 0.0008),
              // @ts-ignore
              lng: landmarks[geminiResult].center.lng + getRandomArbitrary(-0.0008, 0.0008)
            };
            new google.maps.Circle({
              strokeColor: "#1450db",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#6080b8",
              fillOpacity: 0.35,
              map: map,
              center: adjustedCenter,
              radius: 300,
            });
            console.log("Circle center adjusted to:", adjustedCenter);

            // Get user's location
            if (navigator.geolocation) {
              navigator.geolocation.watchPosition((position) => {
                const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };
                
                interface Landmark {
                  center: Position;
                }

                const correctLandmarkCenter: Position = (landmarks[geminiResult] as Landmark).center;
                // If a marker already exists, remove it
                
                if (isWithinRadius(pos, correctLandmarkCenter)){
                  setWin(true)
                }
                
                // @ts-ignore
                if (marker) {
                  marker.setMap(null);
                }
                
                // Add a marker for the user's location
                marker = new google.maps.Marker({
                  position: pos,
                  map: map,
                  title: "Your Location",
                });

                // Center the map on the user's location
            map.setCenter(pos);
          }, () => {
            console.error("Error: The Geolocation service failed.");
          });
        } else {
          console.error("Error: Your browser doesn't support geolocation.");
        }
      } else {
        console.error("Invalid geminiResult or landmarks entry missing:", geminiResult);
          }
  });
  // Clean up the geolocation watch when the component unmounts
  return () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }
  };
}, [geminiResult, win]);

// @ts-ignore
const safeRiddle = riddle === null ? undefined : riddle;

    return (
      <div className="relative h-screen">
                {win ? (
        <div className='flex justify-center items-center absolute inset-0 z-20 w-screen h-screen bg-black/[0.8]'>
            <div className='bg-zinc-900 w-1/2 h-1/2 border border-zinc-400 rounded-lg flex flex-col justify-center items-center'>
                <h6 className="text-white text-center mt-10 text-6xl mx-5 font-extrabold">
                    You Found The
                </h6>
                <span className="text-6xl mx-10  text-center font-extrabold bg-gradient-to-r from-primary to-cyan-300 inline-block text-transparent bg-clip-text">
                    {camelCaseToTitleCase(geminiResult)}
                </span>
                <Link href={`/map`}>
                  <button className="mt-10 py-2 px-4 bg-indigo-500 mb-6 hover:from-primary hover:to-cyan-300 text-white font-bold rounded-lg text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 " onClick={handleClick}>
                      Play Again
                  </button>
                </Link>
            </div>
        </div>
    ) : <></>}


        <div className="w-full h-full border z-0" ref={mapContainerRef}>
          {/* Google Map occupies full container */}
        </div>
        <div className="absolute left-0 bottom-0 w-screen flex flex-col items-start p-2 z-10"> 
            <Alerts riddle={safeRiddle} />
            <Leaderboard />
        </div>
      </div>
    );
  }
  
  export default MapDisplay;