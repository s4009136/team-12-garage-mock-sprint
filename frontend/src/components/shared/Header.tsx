import Link from "next/link";

export default function Header() {
  return (
    <div className="p-2">
        <header className="w-full bg-input-background px-2 py-2">
        <nav className="flex items-center text-xs text-zinc-700">
            <Link
            href="/"
            className="px-2 py-1 hover:text-zinc-900"
            >
            Home
            </Link>

            <div className="h-5 border-l border-zinc-400" />

            <Link
            href="/team"
            className="px-3 py-1 hover:text-zinc-900"
            >
            Team Page
            </Link>
        </nav>
        </header>
    </div>
  );
}