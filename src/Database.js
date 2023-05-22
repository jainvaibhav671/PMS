
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kkouamdlqsrtsxubukbj.supabase.co'
//  const supabaseKey = process.env.SUPABASE_KEY
//  Public Key
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtrb3VhbWRscXNydHN4dWJ1a2JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ1ODI2NDgsImV4cCI6MjAwMDE1ODY0OH0.e53L2LvA4sRFjilGZQDnkB7PbYpto1NJ_EUETiAu0i0"

export const supabase = createClient(supabaseUrl, supabaseKey)