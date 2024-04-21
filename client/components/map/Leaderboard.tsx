"use client";
import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";

export function Leaderboard() {
  return (
    <div className="max-w-sm pt-3">
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-5 bg-white dark:bg-zinc-900">
        <div className="max-h-25 overflow-y-scroll">
            <p className="text-base text-center sm:text-xl text-black mt-4 dark:text-neutral-200">
            LeaderBoard
            </p>

            <p className="text-center text-sm p-5 text-white mt-0 mb-auto">
                
            </p>
        </div>
      </BackgroundGradient>
    </div>
  );
}


export default Leaderboard;