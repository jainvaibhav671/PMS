import { NextRequest, NextResponse } from "next/server";
import { getTasks } from "@/app/utils/Database";

export async function GET(
    req: NextRequest, 
    {
        params
    }: {
        params: {
            list_id: number
        }
    }) {

    const tasks = await getTasks({ list_id: params.list_id });
    return NextResponse.json(tasks);
}