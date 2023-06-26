import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/database.types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_API_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_API_KEY, {
  auth: {
    persistSession: true,
  },
});
