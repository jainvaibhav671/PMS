import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { ProjectMutationType } from "@/app/components/Dashboard/Dashboard";

export async function POST(req: NextRequest) {
  const params: ProjectMutationType = await req.json();

  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const user_id = user?.id;

  // Create project
  const proj_data = {
    name: params.name,
    created_by: user_id,
    parent: params.parent_proj,
  };
  const { data: proj } = await supabase
    .from("Project")
    .insert(proj_data)
    .select();
  const proj_id = proj ? proj[0].id : null;
  console.log("create_proj", proj_id);

  // Create tags
  const { data: tag_ids } = await supabase
    .from("Tag")
    .insert(
      params.tags?.map((t) => {
        return { name: t };
      })!
    )
    .select("id");
  console.log(tag_ids);

  // link project and tags
  if (tag_ids) {
    const project_tags = tag_ids.map((t) => {
      return { project_id: proj_id!, tag_id: t.id };
    });
    await supabase.from("project_tags").insert(project_tags);
  }

  return NextResponse.json("Success");
}
