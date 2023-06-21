import Link from "next/link";
import "./Signup.css";

export default function Signup() {
    return (
        <div id="signup-main">
            <h1>Signup</h1>
            <div id="signup-outer">
                <form method="POST" action="/signup" id="signup">
                    <div className="input">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email"/>
                    </div>

                    <div className="input">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password"/>
                    </div>

                    <button type="submit">Join Now</button>
                </form>
            </div>

            <div id="login-prompt">
               Have an account?<a href="/login">Log in</a>
            </div>

        </div>
    )
}