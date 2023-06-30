import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { project_id: string } }
) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: tags, error } = await supabase
    .from("project_tags")
    .select("*, Tag(name)")
    .eq("project_id", params.project_id);

  if (error) {
    return NextResponse.json([]);
  }

  return NextResponse.json(tags?.map((t) => t.Tag?.name));
}
