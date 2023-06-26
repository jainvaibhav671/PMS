import { NextRequest, NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database, Project } from "@/lib/database.types";

export async function GET(req: NextRequest) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data }: { data: Project[] | null } = await supabase
    .from("Project")
    .select("*")
    .eq("isSubproject", false);

  return NextResponse.json(data, {
    headers: { "Content-Type": "application/json" },
  });
}
