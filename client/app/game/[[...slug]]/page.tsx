import Link from "next/link";
import React from "react";
import { ScavengerHunt } from "@/components/login/ScavengerHunt";
import { Adventure } from "@/components/login/Adventure";


const page = () => {
  return (
    <>
      <div className="w-screen h-screen flex flex-grid justify-center items-center">
        <Link href={`/map`} className="mr-16">
            <ScavengerHunt/>
        </Link>
        <Link href={"https://journai-two.vercel.app"}>
            <Adventure/>
          </Link>
      <div className='flex flex-col justify-around items-center p-4 rounded-md m-4'>
        <div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
