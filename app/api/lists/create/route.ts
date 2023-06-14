import { addList } from "@/app/utils/Database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  const params = await req.json();

  console.log("PARAMS", params);
  await addList({ list_name: params.list_name });
  console.log("addList operation finished")
}
