import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/controllers/auth";
import jwt from "jsonwebtoken";

type User = { username: string; password: string; email: string };

export async function POST(req: NextRequest) {
  const body: User = await req.json(); //  request payload

  try {
    const user = await createUser(body); // Send body directly

    const token = jwt.sign(
      { userId: user.id }, // minimal payload
      process.env.JWT_SECRET!, // secret key
      { expiresIn: "7d" }
    );
    const res = NextResponse.json({ success: true });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return res;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err);
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
  }
}
