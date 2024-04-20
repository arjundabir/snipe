"use client"
import React, { useEffect, useState, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: "AIzaSyAyIr3ZBmZUMAi9kZML91y3JlLc8sFYmPw",
  version: "weekly",
  libraries: ["places"]
});

const mapOptions = {
  center: {
    lat: 34.0699,
    lng: -118.4438
  },
  zoom: 17
};

function BentoGrid() {
    const mapContainerRef = useRef(null);
    const [leaderboardData, setLeaderboardData] = useState([
        { name: "Alice", score: 120 },
        { name: "Bob", score: 90 },
        { name: "Catherine", score: 110 }
    ]);

    useEffect(() => {
        loader.load().then(() => {
            if (mapContainerRef.current) {
                new google.maps.Map(mapContainerRef.current, mapOptions);
            }
        });
    }, []);
    return (
        <div>
            <div className="w-full border border-gray-300 rounded-lg py-72" ref={mapContainerRef}>
                {/*Google Map */}
            </div>
            <div className="flex w-full mb-2 pt-2">
                <div className="flex-1 border border-gray-300 rounded-l-lg p-5 mr-2 max-h-46">
                    Commentator
                </div>
                <div className="w-1/4 border border-gray-300 rounded-r-lg p-5 max-h-46">
                    <h2 className="flex justify-center text-lg font-bold ">Leaderboard</h2>
                    <ul>
                        {leaderboardData.map((entry, index) => (
                            <li key={index} className="mt-2">
                                {entry.name}: {entry.score} points
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default BentoGrid;
