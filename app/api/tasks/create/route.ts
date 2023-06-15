import { NextRequest, NextResponse } from "next/server";
import { createTask } from "@/app/utils/Database";

export async function POST(req: NextRequest) {

    if (!req?.headers) return;
    const data = await req.json();
    await createTask({ task: data });
}