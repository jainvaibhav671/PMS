import { NextRequest, NextResponse } from "next/server";
import { createTask } from "@/app/utils/Database";
import { TaskType } from "@/app/interfaces/Task";

export async function POST(req: NextRequest) {

    const data = await req.json();
    let task = await createTask({ task: data });
    return NextResponse.json(task);
}