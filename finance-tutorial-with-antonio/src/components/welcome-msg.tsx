"use client";

import { useUser } from "@clerk/nextjs";

export const WelcomeMsg = () => {
  const { user, isLoaded } = useUser();

  return (
    <div>
      <h2 className={"text-2xl font-medium capitalize text-white lg:text-4xl"}>
        Welcome Back{isLoaded ? ", " : " "}
        {(user?.fullName || "") + " 👋"}
      </h2>
      <p className={"text-sm text-[#80b6fd] lg:text-base"}>
        This is your Financial Overview Report
      </p>
    </div>
  );
};
