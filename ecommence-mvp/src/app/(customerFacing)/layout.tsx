import React, { ReactNode } from "react";
import Nav, { NavLink } from "@/components/Nav";

export const dynamic = "force-dynamic"; // force Nextjs to not cache any of the admin pages

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Nav>
        <NavLink href={"/"}>Home</NavLink>
        <NavLink href={"/products"}>Products</NavLink>
        <NavLink href={"/orders"}>My Orders</NavLink>
      </Nav>
      <div className={"container my-6"}>{children}</div>
    </>
  );
};

export default Layout;
