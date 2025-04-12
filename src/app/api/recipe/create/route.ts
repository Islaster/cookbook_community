import { NextRequest, NextResponse } from "next/server";
import { create } from "@/controllers/recipes";

export async function POST(req: NextRequest) {
  const body = await req.formData(); //request payload
  try {
    create(body);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
