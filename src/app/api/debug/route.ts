import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  const allHeaders = await headers();

  return NextResponse.json({
    env: {
      NODE_ENV: process.env.NODE_ENV,
      JWT_SECRET: process.env.JWT_SECRET ? "Loaded" : "Missing",
    },
    cookies: allCookies,
    headers: Object.fromEntries(allHeaders),
  });
}
