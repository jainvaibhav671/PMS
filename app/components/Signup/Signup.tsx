import Link from "next/link";
import "./Signup.css";
import { Form } from "./Form";
import { revalidatePath } from "next/cache";
import { Database } from "@/lib/database.types";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export default async function Signup() {
  const handleSubmit = async (formData: FormData) => {
    "use server";

    const supabase = createServerActionClient<Database>({ cookies });
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    console.log("DATA: ", data, error);

    if (!error) {
      redirect("/auth/callback");
    }

    revalidatePath("/");
  };

  return (
    <div id="signup-main">
      <h1>Signup</h1>
      <div id="signup-outer">
        <Form handleSubmit={handleSubmit} />
      </div>

      <div id="login-prompt">
        Have an account?<Link href="/login">Log in</Link>
      </div>
    </div>
  );
}
