import { Project } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const params: {
    proj_id: string;
    data: Partial<Project>;
  } = await req.json();

  const supabase = createServerComponentClient({ cookies });
  const { error } = await supabase
    .from("Project")
    .update(params.data)
    .eq("id", params.proj_id);

  console.log("update proj", params, error);
  return NextResponse.json([]);
}
