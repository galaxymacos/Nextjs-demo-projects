import Link from "next/link";
import React from "react";
import Image from "next/image";

export function HeaderLogo() {
  return (
    <Link href={"/"}>
      <div className={"hidden lg:flex lg:items-center"}>
        <Image src={"/logo.svg"} alt={"Logo"} height={28} width={28} />
        <p className={"font-semibold ml-2 text-white text-2xl"}>Finance</p>
      </div>
    </Link>
  );
}
