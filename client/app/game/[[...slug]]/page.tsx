import Link from "next/link";
import React from "react";
import { ScavengerHunt } from "@/components/login/ScavengerHunt";
import { Adventure } from "@/components/login/Adventure";

interface Props {
  params: { slug: string };
  searchParams: { name: string };
}

const page = ({ params: { slug }, searchParams: { name } }: Props) => {
  return slug == "LAHACKS" ? (
    <div className="h-screen w-screen ">
      <div className="w-screen h-10 bg-white">hello world</div>
      <div className="container flex flex-col">
        <div className="w-full flex">
          <div className="flex-none w-20 bg-yellow-400">hi</div>
          <div className="flex-1 bg-green-200">hi</div>
        </div>
        <div className="flex-1"></div>
        {slug}
        {name}
      </div>
    </div>
  ) : (
    <>
      <div className="w-screen h-screen flex flex-row justify-center items-center">
        <Link href={`/map`} className="mr-16">
            <ScavengerHunt/>
        </Link>
            <Adventure/>
      <div className='flex flex-col justify-around items-center p-4 rounded-md m-4'>
        <div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
