import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { CreateProjectType, Database } from "@/lib/database.types";

export async function POST(req: NextRequest) {
  const params: Omit<CreateProjectType, "created_by"> = await req.json();

  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const user_id = user?.id;

  // Create project
  const proj_data: CreateProjectType = {
    ...params,
    created_by: user_id as string,
  };

  const {error} = await supabase.from("Project").insert(proj_data);
  if (error) console.log(error)

  return NextResponse.json("Success");
}
