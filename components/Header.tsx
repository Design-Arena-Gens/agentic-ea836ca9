import Link from "next/link";

const navLinks = [
  { href: "#rides", label: "Build Gallery" },
  { href: "#mods", label: "Mods & Specs" },
  { href: "#meetups", label: "Meetups" },
  { href: "#connect", label: "Connect" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold uppercase tracking-widest">
          <span className="rounded-full border border-petrol-500 p-1 text-xs text-petrol-300">GSS</span>
          GearShift Society
        </Link>
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-slate-300 hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>
        <Link
          href="#share"
          className="rounded-full border border-petrol-500 px-4 py-2 text-sm font-semibold text-petrol-200 transition hover:border-petrol-300 hover:text-white"
        >
          Share Your Build
        </Link>
      </div>
    </header>
  );
}
