import { Meetup } from "@/lib/types";
import { CalendarDaysIcon, MapPinIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

type MeetupCardProps = {
  meetup: Meetup;
};

export function MeetupCard({ meetup }: MeetupCardProps) {
  const eventDate = new Date(meetup.date);

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-lg transition hover:-translate-y-1 hover:border-petrol-400/60 hover:shadow-petrol-900/30">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs uppercase tracking-[0.3em] text-petrol-200">Meetup</span>
        <time className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-xs text-slate-200">
          {eventDate.toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}
        </time>
      </div>
      <h3 className="text-xl font-semibold text-white">{meetup.title}</h3>
      <p className="text-sm text-slate-300">{meetup.description}</p>
      <dl className="space-y-3 text-sm text-slate-200">
        <div className="flex items-start gap-2">
          <CalendarDaysIcon className="mt-0.5 h-5 w-5 text-petrol-300" />
          <div>
            <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">When</dt>
            <dd>{eventDate.toLocaleString()}</dd>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <MapPinIcon className="mt-0.5 h-5 w-5 text-petrol-300" />
          <div>
            <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">Where</dt>
            <dd>{meetup.location}</dd>
            {meetup.mapUrl && (
              <a
                href={meetup.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-xs text-petrol-200 hover:text-white"
              >
                View map
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
        <div className="flex items-start gap-2">
          <UserGroupIcon className="mt-0.5 h-5 w-5 text-petrol-300" />
          <div>
            <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">Hosted by</dt>
            <dd>{meetup.organizer}</dd>
          </div>
        </div>
      </dl>
      <div className="flex flex-wrap gap-2">
        {meetup.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-petrol-500/70 bg-petrol-500/10 px-3 py-1 text-xs uppercase tracking-wide text-petrol-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
