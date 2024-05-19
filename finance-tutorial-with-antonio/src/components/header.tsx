import React from "react";
import { HeaderLogo } from "@/components/header-logo";
import Navigation from "@/components/navigation";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { WelcomeMsg } from "@/components/welcome-msg";

export function Header() {
  return (
    // whole blue frame
    <header
      className={
        "bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 pb-36 lg:px-14"
      }
    >
      {/*center blue frame*/}
      <div className={"mx-auto max-w-screen-2xl"}>
        {/*1st row*/}
        <div className={"mb-14 flex items-center justify-between"}>
          {/*header left*/}
          <div className={"flex items-center lg:gap-x-16"}>
            <HeaderLogo />
            <Navigation />
          </div>
          {/*header right*/}
          <ClerkLoaded>
            <UserButton afterSignOutUrl={"/"} />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className={"size-8 animate-spin text-slate-400"} />
          </ClerkLoading>
        </div>
        {/*2nd row*/}
        <WelcomeMsg />
      </div>
    </header>
  );
}
