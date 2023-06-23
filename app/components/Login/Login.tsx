"use client";

// import { supabase } from "@/app/utils/Supabase";
// import { Auth } from "@supabase/auth-ui-react";
// import { Theme, ThemeSupa } from "@supabase/auth-ui-shared";
import Link from "next/link";
import "./Login.css";
import { InputGroup } from "../Signup/Form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  return (
    <div id="login-main">
      <h1>Login</h1>
      <div id="login-outer">
        <form method="POST" action="/login" id="login">
          <InputGroup name="email" type="email" label="Email" />
          <InputGroup name="password" type="password" label="Password" />

          <button type="submit">Login</button>
          <div id="below-button">
            <span>
              <input type="checkbox" name="remember" />
              <label htmlFor="remember">Remember me</label>
            </span>
            <span>
              <Link href="/forgot">Forgot Password?</Link>
            </span>
          </div>
        </form>
      </div>

      <div id="signup-prompt">
        Don't have an account?<a href="/signup">Sign Up</a>
      </div>
    </div>
  );
}

// const customTheme: Theme = {
//   default: {
//     colors: {
//       brand: "hsl(153 60.0% 53.0%)",
//       brandAccent: "hsl(154 54.8% 45.1%)",
//       brandButtonText: "white",
//       // ..
//     },
//   },
// };

// export const Login = () => (
//   <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
//     <Auth
//       supabaseClient={supabase}
//       appearance={{ theme: ThemeSupa }}
//       providers={["google", "github"]}
//     />
//   </div>
// );
