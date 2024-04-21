"use client";
import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";

export function Adventure() {
  return (
    <div>
      <BackgroundGradient className="rounded-[22px] max-w-sm line-clamp-7 p-4 sm:p-10 bg-white dark:bg-zinc-900">
      <img
          src="/cat2.jpg"
          alt="A cute cat"
          height="400"
          width="400"
          className="object-contain"
        />
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          Adventure
        </p>

        <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Utilizing Gemini AI, answer a short, 4 question survey. After analyzing your answers,
        Gemini will tailor a personalized tour around campus based off of your preferences. 
        Jump into an interactive AI enhanced adventure and learn more about popular UCLA landmarks!
        </p>
        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          <span>Interactive </span>
          <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
            AI
          </span>
        </button>
      </BackgroundGradient>
    </div>
  );
}
