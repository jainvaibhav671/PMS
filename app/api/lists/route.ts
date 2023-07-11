import { NextRequest, NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database, ProjectInfoType } from "@/lib/database.types";

export async function GET(req: NextRequest) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data }: { data: ProjectInfoType[] | null } = await supabase
    .from("Project")
    .select("*, project_tags(Tag(name))")
    .eq("isSubproject", false);

  // console.log(data)

  return NextResponse.json(data, {
    headers: { "Content-Type": "application/json" },
  });
}
