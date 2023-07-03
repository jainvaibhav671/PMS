import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { project_id: string } }
) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("Project")
    .select("*, project_tags(Tag(name))")
    .eq("id", params.project_id);
  if (data && data.length > 0) return NextResponse.json(data[0]);
}
