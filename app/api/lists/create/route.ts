import { addList } from "@/app/utils/Database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  const params = await req.json();
  await addList({ list_name: params.list_name });
}
