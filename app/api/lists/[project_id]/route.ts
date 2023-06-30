import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      project_id: string;
    };
  }
) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: projects, error } = await supabase
    .from("Project")
    .select("*, project_tags(tag_id)")
    .eq("parent", params.project_id);
  if (error || !projects) {
    return NextResponse.json([]);
  }
  return NextResponse.json(projects);
}
