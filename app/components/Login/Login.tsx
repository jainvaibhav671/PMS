"use client";
import "./Login.css";
import { Form } from "./Form";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Modal from "../Modal/Modal";
import { useState } from "react";

export default function Login() {
  const isError = useSearchParams().has("error");
  const [open, setOpen] = useState(isError);

  return (
    <div id="login-main">
      <h1>Login</h1>
      <div id="login-outer">
        <Form />
      </div>

      <Modal title="" open={open} setOpen={setOpen}>
        <p className="w-[20ch]">
          Invalid Login Credentials. Make sure you have entered the correct
          email and password.
        </p>
      </Modal>

      <div id="signup-prompt">
        {"Don't have an account? "}
        <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
