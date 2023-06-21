import { prisma } from "@/app/utils/Database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const params = await req.json();
  const user_id = "52d2341d-a657-42f5-b6a9-7935fafccd3d"

  console.log("Creating", params);
  if (params.parent_proj.length > 0) {
    await prisma.project.create({
      data: {
        name: params.name,
        created_by: user_id,
        parent_project: params.parent_proj
      }
    })
  } else {
    await prisma.project.create({
      data: {
        name: params.project_name,
        created_by: user_id,
      }
    })
  }
  console.log("Completed")
  return res
}
