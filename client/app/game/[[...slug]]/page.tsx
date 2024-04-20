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
      <div className="w-screen h-screen flex justify-center items-center">
        <h1 className="font-medium text-2xl">
          Join Session:{" "}
          <Link href={`/game/LAHACKS?name=${name}`}>
            <span className="font-bold bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text border-b">
              LAHACKS
            </span>
          </Link>
        </h1>
      </div>
    </>
  );
};

export default page;
