import Link from "next/link";
import React from "react";

function LoginButton() {
  return (
    <Link href="/login">
      <button
        style={{ position: "relative", zIndex: 1000 }}
        className="btn btn-primary text-white"
      >
        Login
      </button>
    </Link>
  );
}

export default LoginButton;
