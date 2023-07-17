import { Database } from "@/lib/supabase.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const params: {
        proj_id: string,
        tag_name: string
    } = await req.json();

    
    const supabase = createServerComponentClient<Database>({ cookies })
    const { data } = await supabase.from("Tag").select("id").eq("name", params.tag_name)
    console.log(params, data);

    if (data) {
        const { data: data1, error } = await supabase.from("project_tags").delete().match({
            project_id: params.proj_id,
            tag_id: data[0].id
        })
        console.log(error, data1)
    }

    return NextResponse.json([]);
}