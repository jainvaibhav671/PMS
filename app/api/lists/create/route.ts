import { prisma } from "@/app/utils/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const params = await req.json();
  const user_id = "52d2341d-a657-42f5-b6a9-7935fafccd3d";

  console.log("Creating", params);
  if (!params.parent_proj) {
    await prisma.project.create({
      data: {
        name: params.name,
        created_by: user_id,
        parent_project: params.parent_proj,
      },
    });
  } else {
    await prisma.project.create({
      data: {
        name: params.name,
        created_by: user_id,
      },
    });
  }
  console.log("Completed");
  return NextResponse.json("Success");
}
