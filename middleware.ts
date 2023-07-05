import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { Database } from "./lib/database.types";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const {
    data: { session },
  } = await supabase.auth.refreshSession();

  if (session) console.log("Logged in");
  if (!session)
    return NextResponse.redirect(
      "http://task-lists-cse-vaibhav.vercel.app/login"
    );
  return res;
}

export const config = {
  matcher: "/",
};
