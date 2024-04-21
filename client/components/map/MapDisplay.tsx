"use client";

import React, { useEffect, useState, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import Leaderboard from "./Leaderboard";
import Alerts from "./Alerts";
import { fetchLocation } from "@/utils/geoLocation";

interface Props {
  name: string;
  session: string;
}

const loader = new Loader({
  apiKey: "AIzaSyAyIr3ZBmZUMAi9kZML91y3JlLc8sFYmPw",
  version: "weekly",
  libraries: ["places"],
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

function MapDisplay({ name, session }: Props) {
  const mapContainerRef = useRef(null);

  function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  // needs to take a landmark as a parameter
  useEffect(() => {
    loader.load().then(() => {
      if (mapContainerRef.current) {
        const map = new google.maps.Map(mapContainerRef.current, mapOptions);
        for (const city in landmarks) {
          new google.maps.Circle({
            strokeColor: "#1450db",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#6080b8",
            fillOpacity: 0.35,
            map: map,

            center: {
              lat:
                landmarks[city as keyof typeof landmarks].center.lat +
                getRandomArbitrary(-0.0008, 0.0008),
              lng:
                landmarks[city as keyof typeof landmarks].center.lng +
                getRandomArbitrary(-0.0008, 0.0008),
            },
            radius: 200,
          });
        }
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { latitude, longitude } = await fetchLocation();
      const data = {
        name,
        latitude,
        longitude,
      };
      await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    };

    const interval = setInterval(() => fetchData(), 2000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="relative h-screen">
      <h1 className="font-medium text-lg text-black p-2">
        session: <span className="font-bold ">{session} </span> user:{" "}
        <span className="font-bold">{name}</span>
      </h1>

      <div className="w-full h-full border z-0" ref={mapContainerRef}>
        {/* Google Map occupies full container */}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex p-2 z-10">
        <Alerts />
        <Leaderboard />
      </div>
    </div>
  );
}

export default MapDisplay;
