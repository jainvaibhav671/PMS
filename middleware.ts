import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { Database } from "./lib/database.types";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const {
    data: { session }, error
  } = await supabase.auth.getSession();
  console.log("middleware", session, error)

  if (session) console.log("Logged in");
  if (!session) return NextResponse.redirect("http://localhost:3000/login");
  return res;
}

export const config = {
  matcher: "/",
};
