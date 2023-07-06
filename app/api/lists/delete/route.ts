import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const params: { proj_id: string } = await req.json();
  console.log("params", params);

  const supabase = createServerComponentClient<Database>({ cookies });
  const { error } = await supabase
    .from("Project")
    .delete()
    .eq("id", params.proj_id);

  if (error) console.log("delete project", error);
  return NextResponse.json(error ? false : true);
}
