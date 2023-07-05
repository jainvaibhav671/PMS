import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { CreateProject, Database } from "@/lib/database.types";
import { ProjectMutationType } from "@/app/components/Sidebar/Header/Header";

export async function POST(req: NextRequest) {
  const params: ProjectMutationType = await req.json();

  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const user_id = user?.id;

  // Create project
  const proj_data: CreateProject = {
    ...params,
    deadline: null,
    created_by: user_id as string,
    isSubproject: params.parent !== null,
  };

  await supabase.from("Project").insert(proj_data);

  return NextResponse.json("Success");
}
