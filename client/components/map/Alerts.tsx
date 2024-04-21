"use client";
import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";

export function Alerts({ riddle="Loading Riddle..." }) {
  return (
    <div className="max-w-sm max-h-sm">
      <BackgroundGradient className="rounded-[22px] max-w-64 w-64 p-4 sm:p-5 bg-white dark:bg-zinc-900">
        <div className="max-h-25 overflow-y-scroll">
            <p className="text-base text-center sm:text-xl text-black mt-4 dark:text-neutral-200">
            Find Me...
            </p>

            <p className="text-center text-sm p-5 text-white mt-0 mb-auto">
                {riddle}
            </p>
        </div>
      </BackgroundGradient>
    </div>
  );
}


export default Alerts;