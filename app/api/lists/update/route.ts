import { Project } from "@/lib/database.types";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  const params: {
    proj_id: string;
    data: Partial<Project>;
  } = await req.json();
  console.log(params);
}
