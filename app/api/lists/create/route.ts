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

  if (params.tags) {
    // Create tags if not already exist
    await supabase.from("Tag").upsert(
      params.tags.map((t) => {
        return { name: t };
      })!,
      { onConflict: "name", ignoreDuplicates: true }
    );

    // fetch tag ids
    const { data: tag_ids } = await supabase
      .from("Tag")
      .select("id")
      .in("name", params.tags);
    // link project and tags
    if (tag_ids) {
      const project_tags = tag_ids.map((t) => {
        return { project_id: proj_id!, tag_id: t.id };
      });
      await supabase.from("project_tags").insert(project_tags);
    }
  }

  return NextResponse.json("Success");
}
