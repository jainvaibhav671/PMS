import { ListType } from "@/app/interfaces/Lists";
import { getLists } from "@/app/utils/Database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse<ListType[]> | undefined> {
  let lists = await getLists();

  if (!req.headers || !lists) {
    return NextResponse.json([]);
  }

  return NextResponse.json(lists);
}
