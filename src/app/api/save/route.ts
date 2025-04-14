import { saveToggle } from "@/controllers/save";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  const recipeId = parseInt(id, 10);
  const result = await saveToggle(recipeId);
  if (!result)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  return NextResponse.json(result, { status: result.status });
}
