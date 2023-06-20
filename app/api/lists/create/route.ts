import { prisma } from "@/app/utils/Database";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const params = await req.json();
  const user_id = "52d2341d-a657-42f5-b6a9-7935fafccd3d"
  console.log(params)
  await prisma.project.create({
    data: {
      name: params.project_name,
      created_by: user_id,
    }
  })
}
