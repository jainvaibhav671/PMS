"use client";
import Link from "next/link";
import "./Signup.css";
import { Form } from "./Form";
import { FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default async function Signup() {

    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        axios.post("/api/user", {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password")
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).catch(() => { });

        router.push("/login")
    };

    return (
        <div id="signup-main">
            <h1>Signup</h1>
            <div id="signup-outer">
                {<Form handleSubmit={handleSubmit} />}
            </div>

            <div id="login-prompt">
               Have an account?<Link href="/login">Log in</Link>
            </div>

        </div>
    )
}


