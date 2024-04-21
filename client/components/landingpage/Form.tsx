"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { setCookie } from "cookies-next";
import { fetchLocation } from "@/utils/geoLocation";

const Form = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const [accessGranted, setAccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const sessionInput = form.elements.namedItem("session") as HTMLInputElement;
    const data = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        name: nameInput.value,
        session: sessionInput.value,
        latitude: lat,
        longitude: lng,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const response = await data.json();
    setCookie("session", nameInput.value);

    router.push(`/game/${sessionInput.value}?name=${nameInput.value}`);
  };

  const handleClick = async () => {
    setAccess(true);
    try {
      const { latitude, longitude } = await fetchLocation();
      setLat(latitude);
      setLng(longitude);
    } catch (error) {
      console.error("Failed to fetch location:", error);
    }
  };

  return (
    <div className="flex justify-center">
      {!accessGranted ? (
        <>
          <button className="btn btn-success" onClick={handleClick}>
            Grant Access
          </button>
        </>
      ) : (
        <>
          {" "}
          <form
            className="flex flex-col space-y-4 max-w-md w-[20rem]"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Enter your Name"
              name="name"
              className="input input-ghost w-full max-w-xs"
              required
            />

            <input
              type="text"
              placeholder="Enter Session"
              name="session"
              className="input input-ghost w-full max-w-xs"
              value="LAHACKS"
              disabled
            />

            <button
              className="btn btn-[#000B43]"
              type="submit"
              disabled={lat == 0}
            >
              {lat == 0 ? "Waiting for Location" : "Join the Game!"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Form;
