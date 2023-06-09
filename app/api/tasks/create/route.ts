import { NextRequest, NextResponse } from "next/server";
import { createTask } from "@/app/utils/Database";

export async function POST(req: NextRequest) {

    const data = await req.json();
    let task = await createTask({ task: data });

    if (task !== null) {   
        return NextResponse.json(task);
    }
    return NextResponse.json([]);
}