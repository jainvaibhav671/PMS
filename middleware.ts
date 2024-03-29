import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { Database } from "./lib/database.types";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const projectUrl = process.env.NEXT_PUBLIC_URL as string
  const {
    data: { session }, error
  } = await supabase.auth.getSession();

  if (session) console.log("Logged in");
  if (!session) return NextResponse.redirect(`${projectUrl}/login`);
  return res;
}

export const config = {
  matcher: "/",
};
