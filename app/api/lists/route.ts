import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/utils/Database";

export async function GET(req: NextRequest) {
  const projects = await prisma.project.findMany();
  return NextResponse.json(projects);
}
