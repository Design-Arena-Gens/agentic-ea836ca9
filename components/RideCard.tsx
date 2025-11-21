import Image from "next/image";
import { Ride } from "@/lib/types";
import { clsx } from "clsx";
import { SparklesIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

type RideCardProps = {
  ride: Ride;
};

const categoryColors: Record<Ride["category"], string> = {
  car: "bg-emerald-500/20 text-emerald-200",
  bike: "bg-fuchsia-500/20 text-fuchsia-200",
  truck: "bg-amber-500/20 text-amber-200"
};

export function RideCard({ ride }: RideCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-xl transition hover:-translate-y-1 hover:border-petrol-400/70 hover:shadow-petrol-900/40">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={ride.image}
          alt={ride.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 400px, 100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span
            className={clsx(
              "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur",
              categoryColors[ride.category]
            )}
          >
            {ride.category}
          </span>
          <span className="rounded-full bg-slate-950/60 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur">
            {ride.location}
          </span>
        </div>
        <div className="absolute bottom-4 left-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Built by {ride.owner}</p>
          <h3 className="text-2xl font-semibold text-white">{ride.title}</h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-6 p-6">
        <p className="text-sm text-slate-300">{ride.tagline}</p>
        <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 lg:grid-cols-4">
          <Spec label="Engine" value={ride.specs.engine} />
          <Spec label="Power" value={ride.specs.power} />
          <Spec label="Drivetrain" value={ride.specs.drivetrain} />
          <Spec label="Wheels" value={ride.specs.wheels} />
        </div>
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
            <WrenchScrewdriverIcon className="h-5 w-5 text-petrol-300" />
            Signature Mods
          </div>
          <ul className="space-y-2 text-sm text-slate-300">
            {ride.mods.slice(0, 4).map((mod) => (
              <li key={mod} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-petrol-300" />
                {mod}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-2">
          {ride.featuredMods.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full border border-petrol-500/60 bg-petrol-500/10 px-3 py-1 text-xs uppercase tracking-wide text-petrol-200"
            >
              <SparklesIcon className="h-4 w-4" />
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto">
          <ul className="flex flex-wrap gap-3 text-sm text-slate-300">
            {ride.socials.instagram && (
              <SocialLink href={ride.socials.instagram} label="Instagram" />
            )}
            {ride.socials.youtube && <SocialLink href={ride.socials.youtube} label="YouTube" />}
            {ride.socials.tiktok && <SocialLink href={ride.socials.tiktok} label="TikTok" />}
          </ul>
        </div>
      </div>
    </article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/5 p-3">
      <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-50">{value}</p>
    </div>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 hover:text-white"
      >
        <span>{label}</span>
        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
      </a>
    </li>
  );
}
