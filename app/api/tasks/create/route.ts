import { NextRequest, NextResponse } from "next/server";
import { createTask } from "@/app/utils/Database";
import { TaskType } from "@/app/interfaces/Task";

export async function POST(req: NextRequest) {

    const data = await req.json();
    console.log(data)
    let task = await createTask({ task: data });
    console.log(task);
    return NextResponse.json(task);
}