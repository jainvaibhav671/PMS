import { getLists } from "@/app/utils/Database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let projects = await getLists();
  return NextResponse.json(projects);
}
