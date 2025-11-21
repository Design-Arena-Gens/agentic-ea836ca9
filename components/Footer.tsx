export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/90 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-400 md:flex-row">
        <p>&copy; {new Date().getFullYear()} GearShift Society. Built by enthusiasts, for enthusiasts.</p>
        <div className="flex gap-4">
          <a href="https://discord.com" target="_blank" rel="noreferrer">
            Discord
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="mailto:garage@gearshift.society">Email</a>
        </div>
      </div>
    </footer>
  );
}
