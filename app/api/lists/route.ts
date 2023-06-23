import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/utils/Prisma";
import { supabase } from "@/app/utils/Supabase";

export async function GET(req: NextRequest) {
  // const projects = await prisma.project.findMany({
  //   where: {
  //     parent_project: { equals: null },
  //   },
  // });

  const projects = await supabase
    .from("Project")
    .select()
    .eq("parent_project", null);

  console.log(projects);
  return NextResponse.json(projects, {
    headers: { "Content-Type": "application/json" },
  });
}
