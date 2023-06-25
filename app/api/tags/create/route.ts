import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

export async function POST(req: NextRequest) {
  const params = await req.json();
  console.log(params);
}
