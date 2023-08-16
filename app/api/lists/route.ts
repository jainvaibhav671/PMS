import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/database.types";

export const dynamic = "force-dynamic"

export async function GET() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("Project")
    .select("*, project_tags(Tag(name))")
    .eq("isSubproject", false);

  if (error) console.log("All Projects", error)

  return NextResponse.json(data)
}
