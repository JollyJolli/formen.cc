import Link from "next/link";

export default function NotFound() {
  return (
    <main className="hero">
      <p className="eyebrow">404 / Page not found</p>
      <h1>Lost?</h1>
      <p className="hero-statement">This page does not exist.</p>
      <Link className="text-link" href="/">
        Back to Formen
      </Link>
    </main>
  );
}
