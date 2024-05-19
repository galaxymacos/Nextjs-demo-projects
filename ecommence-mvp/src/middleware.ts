import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "@/lib/isValidPassword";

export async function middleware(req: NextRequest) {
  if (!(await isAuthenticated(req))) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }
}

async function isAuthenticated(req: NextRequest) {
  const authHeader =
    req.headers.get("authorization") || req.headers.get("Authorization");
  if (!authHeader) return false;

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  const isValidAdmin =
    username === process.env.ADMIN_USERNAME &&
    (await isValidPassword(
      password,
      process.env.ADMIN_HASHED_PASSWORD as string,
    ));
  console.log(`isValidAdmin: ${isValidAdmin}`);
  return isValidAdmin;
}

export const config = {
  matcher: "/admin/:path*",
};
