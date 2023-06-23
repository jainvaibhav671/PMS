import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse<string>> {
  const data = await req.json();
  console.log(data);

  return NextResponse.json("success");
}
