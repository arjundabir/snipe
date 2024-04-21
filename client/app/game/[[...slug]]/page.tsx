import Link from "next/link";
import React from "react";
import { ScavengerHunt } from "@/components/login/ScavengerHunt";
import { Adventure } from "@/components/login/Adventure";

const page = () => {
  return (
    <>
      <div className="w-dvw h-full md:h-dvh flex flex-wrap justify-center items-center gap-4 p-4">
        <Link href={`/map`}>
          <ScavengerHunt />
        </Link>
        <Link href={"https://journai-two.vercel.app"}>
          <Adventure />
        </Link>
        <div className="flex flex-col justify-around items-center p-4 rounded-md m-4"></div>
      </div>
    </>
  );
};

export default page;
