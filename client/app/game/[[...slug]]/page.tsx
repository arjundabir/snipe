import Link from "next/link";
import React from "react";

interface Props {
  params: { slug: string };
  searchParams: { name: string };
}

const page = ({ params: { slug }, searchParams: { name } }: Props) => {
  return slug == "LAHACKS" ? (
    <div>
      {slug}
      {name}
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
