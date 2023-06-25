import "./Login.css";
import { redirect } from "next/navigation";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { cookies } from "next/headers";
import { Form } from "./Form";
import Link from "next/link";

export default function Login() {
  const handleSignIn = async (formData: FormData) => {
    "use server";
    const supabase = createServerActionClient<Database>({ cookies });
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("LOGIN", data, error);
    if (!error) {
      redirect("/");
    }
  };

  return (
    <div id="login-main">
      <h1>Login</h1>
      <div id="login-outer">
        <Form handleSignIn={handleSignIn} />
      </div>

      <div id="signup-prompt">
        {"Don't have an account?"}
        <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
