import Link from "next/link";
import React from "react";

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
      <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className='flex flex-col justify-around items-center p-4 rounded-md m-4'>
        <p className='text-xl underline font-bold'>How to play</p>
        <div className='flex flex-col justify-around items-center mt-5'>
          <p>A circle will appear on your map. This circle contains a landmark that you need to find.</p>
          <p>To help you identify the landmark, solve the riddle provided. The solution to the riddle is a hint about the landmark.</p>
          <p>Approach the landmark. You win when you are close enough to it!</p>
        </div>
        <div>
          <h1 className="font-medium text-2xl mt-10">
            <Link href={`/map`}>
              <span className="font-bold bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text border-b">
                Start Game
              </span>
            </Link>
          </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
