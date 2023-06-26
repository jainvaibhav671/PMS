import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { CreateProject, Database } from "@/lib/database.types";
import { ProjectMutationType } from "@/app/components/Dashboard/Dashboard";

export async function POST(req: NextRequest) {
  const params: ProjectMutationType = await req.json();

  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const user_id = user?.id;

  // Create project
  console.log("Creating project");
  const proj_data: CreateProject = {
    name: params.name,
    created_by: user_id as string,
    parent: params.parent_proj as string,
    isSubproject: params.parent_proj !== null,
  };
  const { data: proj } = await supabase
    .from("Project")
    .insert(proj_data)
    .select();
  const proj_id = proj ? proj[0].id : null;
  console.log("created_proj", proj_id);

  // Create tags
  console.log("Creating tags");
  const { data: tag_ids } = await supabase
    .from("Tag")
    .upsert(
      params.tags?.map((t) => {
        return { name: t };
      })!
    )
    .select("id");
  console.log(tag_ids);
  console.log("Created tags");

  // link project and
  console.log("Linking project and tags");
  if (tag_ids) {
    const project_tags = tag_ids.map((t) => {
      return { project_id: proj_id!, tag_id: t.id };
    });
    await supabase.from("project_tags").insert(project_tags);
  }
  console.log("Linked");

  return NextResponse.json("Success");
}
