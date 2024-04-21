"use client";
import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";

export function ScavengerHunt() {
  return (
    <div>
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
      <img
          src="/cat.jpg"
          alt="A cute cat"
          height="400"
          width="400"
          className="object-contain"
        />
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          Scavenger Hunt
        </p>

        <p className="text-sm text-neutral-600 dark:text-neutral-400">
        A circle will appear on your map. This circle contains a landmark that you need to find.
        To help you identify the landmark, solve the riddle provided. The solution to the riddle 
        is a hint about the landmark. Approach the landmark to win!
        </p>
        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          <span>Explore </span>
          <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
            AI
          </span>
        </button>
      </BackgroundGradient>
    </div>
  );
}
