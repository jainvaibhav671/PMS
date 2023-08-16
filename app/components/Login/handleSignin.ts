"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { cookies } from "next/headers";

export const handleSignIn = async (email: string, password: string) => {
    const supabase = createServerActionClient<Database>({ cookies });
    console.log(email, password);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log("LOGIN", data, error);
    return error
  };