import { getLists } from "@/app/utils/Database";
import { NextResponse } from "next/server";

export async function GET() {

    let lists = await getLists()

    return NextResponse.json(lists);
}