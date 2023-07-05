import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

export async function POST(req: NextRequest) {
  const params: {
    tags: string[];
    project: string;
  } = await req.json();
  console.log("parms", params);
  const supabase = createServerComponentClient<Database>({ cookies });

  // Create tag in database if not already exists
  const { error } = await supabase.from("Tag").upsert(
    params.tags.map((t) => {
      return { name: t };
    }),
    { ignoreDuplicates: true, onConflict: "name" }
  );
  console.log("creating tag", params.tags, error);
  // now fetch the ids of those tags
  const { data: ids, error: error2 } = await supabase
    .from("Tag")
    .select("id")
    .in("name", params.tags)
    .then((res) => {
      return { error: res.error, data: res.data?.map((i) => i.id) };
    });
  console.log("fetching", ids, error);

  // Link to project
  if (ids) {
    const { error: error3 } = await supabase.from("project_tags").upsert(
      ids.map((id) => {
        return {
          project_id: params.project,
          tag_id: id,
        };
      }),
      {
        ignoreDuplicates: true,
      }
    );
    console.log("linking", error);
  }

  return NextResponse.json([]);
}
