import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

export async function POST(req: NextRequest) {
  const params = await req.json();

  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const user_id = user?.id;

  console.log("Creating", params);
  if (!params.parent_proj) {
    await supabase.from("Project").insert({
      name: params.name,
      created_by: user_id,
    });

    console.log({
      name: params.name,
      created_by: user_id,
    });
  } else {
    await supabase.from("Project").insert({
      name: params.name,
      created_by: user_id,
      parent: params.parent_proj,
    });

    console.log({
      name: params.name,
      created_by: user_id,
      parent: params.parent_proj,
    });
  }
  console.log("Completed");
  return NextResponse.json("Success");
}
