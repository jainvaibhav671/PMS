import Link from "next/link";

export default function Page() {
  return (
    <>
      <h2>Verification mail has been sent to you. Verify your account</h2>
      <Link href="/login">Login</Link>
    </>
  );
}
