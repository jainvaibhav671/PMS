import Link from "next/link";
import "./Login.css";

export default function Login() {
    return (
        <div id="login-main">
            <h1>Login</h1>
            <div id="login-outer">
                <form method="POST" action="/login" id="login">
                    <div className="input">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email"/>
                    </div>

                    <div className="input">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password"/>
                    </div>

                    <button type="submit">Login</button>
                    <div id="below-button">
                        <span>
                            <input type="checkbox" name="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </span>
                        <span><Link href="/forgot">Forgot Password?</Link></span>
                    </div>
                </form>
            </div>

            <div id="signup-prompt">
               Don't have an account?<a href="/signup">Sign Up</a>
            </div>

        </div>
    )
}