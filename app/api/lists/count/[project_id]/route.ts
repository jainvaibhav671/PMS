import { Database } from "@/lib/supabase.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { project_id: string }}) {
    
    console.log(params.project_id)
    const supabase = createServerComponentClient<Database>({ cookies })
    if (params.project_id !== "no_proj") {
        const { count: totalProjects, error: error1 } = await supabase.from("Project").select("*", {count: "exact"}).eq("parent", params.project_id);
        const { count: completedProjects, error: error2 } = await supabase.from("Project").select("id", {count: "exact"}).match({ parent: params.project_id, isCompleted: true })
        supabase.from("Project").select()

        if (!error1 && !error2) {
            return NextResponse.json([totalProjects, completedProjects]);
        }
    } else {
        const { count: totalProjects, error: error1 } = await supabase.from("Project").select("*", {count: "exact"}).eq("isSubproject", false);
        const { count: completedProjects, error: error2 } = await supabase.from("Project").select("id", {count: "exact"}).match({ isSubproject: false, isCompleted: true })

        if (!error1 && !error2) {
            return NextResponse.json([totalProjects, completedProjects]);
        }
    }
    
    return NextResponse.json([]);
}