import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Barber</h1>
      <Link href="/auth/login">Login</Link>
      <br />
      <Link href="/auth/register">Register</Link>
    </div>
  );
}
