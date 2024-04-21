import React from "react";
import MapDisplay from "@/components/map/MapDisplay";

interface Props {
  params: { slug: string };
  searchParams: { name: string };
}

export default function Home({
  params: { slug },
  searchParams: { name },
}: Props) {
  return (
    <main className="w-screen h-screen">
      <MapDisplay name={name} session={slug} />
    </main>
  );
}
