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
  console.log(params.project_id);
  const { data: projects, error } = await supabase
    .from("Project")
    .select("*, project_tags(tag_id)")
    .eq("parent", params.project_id);
  console.log(projects);
  if (error || !projects) {
    console.log("Fetch Subprojects: ", params.project_id, error);
    return NextResponse.json([]);
  }
  return NextResponse.json(projects);
}
