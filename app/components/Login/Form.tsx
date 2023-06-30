import Link from "next/link";
import { InputGroup } from "../Signup/Form";

export function Form({
  handleSignIn,
}: {
  handleSignIn: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={handleSignIn} id="login">
      <InputGroup name="email" type="email" label="Email" />
      <InputGroup name="password" type="password" label="Password" />

      <button type="submit" className="primary-button">
        Login
      </button>
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
  );
}
