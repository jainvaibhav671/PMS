import { toggleTask } from "@/app/utils/Database";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

  try {
    let params = await req.json();
    console.log(params)
    await toggleTask({
      task_id: params.task_id,
      isCompleted: params.isCompleted
    });
  } catch (error) {}
}