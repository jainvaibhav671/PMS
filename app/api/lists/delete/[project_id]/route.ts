import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { project_id }: { project_id: string }) {
    const supabase = createServerComponentClient<Database>({ cookies })
    await supabase.from("Project").delete().eq("id", project_id)
}