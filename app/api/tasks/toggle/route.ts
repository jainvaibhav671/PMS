import { toggleTask } from "@/app/utils/Database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  let params = await req.json();

  console.log(params)
  await toggleTask({
    task_id: params.task_id,
    isCompleted: params.isCompleted
  });
}