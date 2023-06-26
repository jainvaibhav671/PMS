import "./Signup.css";
import { Form } from "./Form";
import { Database } from "@/lib/database.types";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const handleSubmit = async (formData: FormData) => {
    "use server";

    const supabase = createServerActionClient<Database>({ cookies });
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (!error) {
      redirect("/auth/callback");
    }
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
