"use client";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import React from "react";

const Checker = () => {
  const router = useRouter();
  const session = getCookie("session");
  if (session) {
    router.push(`/game/LAHACKS?name=${session}`);
  }

  return <div></div>;
};

export default Checker;
