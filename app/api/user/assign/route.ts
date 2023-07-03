import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { project_id }: { project_id: string } = await req.json();
    const supabase = createServerComponentClient<Database>({ cookies })
    const { data: { user }} = await supabase.auth.getUser();
    const user_id = user?.id;

    if (user_id) {
        await supabase.from("project_users").insert({ project_id: project_id, user_id: user_id })
        return NextResponse.json(true);
    }
    return NextResponse.json(false);
}