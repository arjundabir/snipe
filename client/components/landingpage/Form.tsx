import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Form = () => {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const sessionInput = form.elements.namedItem("session") as HTMLInputElement;
    router.push(`/game/${sessionInput.value}?name=${nameInput.value}`);

    // Handle form submission logic here
  };
  return (
    <div className="flex justify-center mt-4">
      <form
        className="flex flex-col space-y-4 max-w-md w-[20rem]"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Enter your Name"
          name="name"
          className="input input-ghost w-full max-w-xs"
          required
        />

        <input
          type="text"
          placeholder="Enter Session"
          name="session"
          className="input input-ghost w-full max-w-xs"
          required
        />

        <button className="btn btn-[#000B43]" type="submit">
          Join the Game!
        </button>
      </form>
    </div>
  );
};

export default Form;
