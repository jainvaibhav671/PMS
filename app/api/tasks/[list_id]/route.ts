import { NextRequest, NextResponse } from "next/server";
import { getLists } from "@/app/utils/Database";

export async function GET(
    req: NextRequest, 
    {
        params
    }: {
        params: {
            list_id: number
        }
    }) {
    // const list_id: string = `${params.list_id}`;

    // console.log(await getLists());

    return NextResponse.json([
        "Task 1",
        "Task 2",
        "Task 3",
        "Task 4",
    ]);
}