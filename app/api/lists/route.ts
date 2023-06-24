import { NextRequest, NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/database.types";

export async function GET(req: NextRequest) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase.from("Project").select("*");

  console.log("Projects", data, error);
  return NextResponse.json(data, {
    headers: { "Content-Type": "application/json" },
  });
}
