'use client';

import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RideCard } from "@/components/RideCard";
import { MeetupCard } from "@/components/MeetupCard";
import { meetups as seedMeetups, rides as seedRides } from "@/lib/sample-data";
import type { Meetup, Ride, RideCategory } from "@/lib/types";
import Image from "next/image";
import {
  ArrowRightIcon,
  BoltIcon,
  ChatBubbleBottomCenterTextIcon,
  CursorArrowRaysIcon,
  PhotoIcon,
  PlusIcon,
  RectangleStackIcon,
  RocketLaunchIcon
} from "@heroicons/react/24/outline";

type RideFormState = {
  title: string;
  owner: string;
  tagline: string;
  category: RideCategory;
  image: string;
  location: string;
  engine: string;
  drivetrain: string;
  power: string;
  wheels: string;
  mods: string;
  featured: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
};

type MeetupFormState = {
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: string;
  mapUrl: string;
  tags: string;
};

const initialRideForm: RideFormState = {
  title: "",
  owner: "",
  tagline: "",
  category: "car",
  image: "",
  location: "",
  engine: "",
  drivetrain: "",
  power: "",
  wheels: "",
  mods: "",
  featured: "",
  instagram: "",
  youtube: "",
  tiktok: ""
};

const initialMeetupForm: MeetupFormState = {
  title: "",
  description: "",
  date: "",
  location: "",
  organizer: "",
  mapUrl: "",
  tags: ""
};

export default function HomePage() {
  const [rides, setRides] = useState<Ride[]>(seedRides);
  const [meetups, setMeetups] = useState<Meetup[]>(seedMeetups);
  const [rideForm, setRideForm] = useState<RideFormState>(initialRideForm);
  const [meetupForm, setMeetupForm] = useState<MeetupFormState>(initialMeetupForm);

  const communityStats = useMemo(
    () => [
      { label: "Registered Builds", value: rides.length.toString() },
      {
        label: "Upcoming Meets",
        value: meetups.filter((meetup) => new Date(meetup.date) > new Date()).length.toString()
      },
      { label: "Countries Represented", value: new Set(rides.map((ride) => ride.location)).size },
      { label: "Discord Members", value: "12,487" }
    ],
    [rides, meetups]
  );

  const handleRideInput =
    (field: keyof RideFormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRideForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleMeetupInput =
    (field: keyof MeetupFormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setMeetupForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const submitRide = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!rideForm.title || !rideForm.owner || !rideForm.image) return;

    const mods = rideForm.mods
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const featured = rideForm.featured
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const newRide: Ride = {
      id: `${rideForm.owner.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      title: rideForm.title,
      owner: rideForm.owner,
      tagline: rideForm.tagline || "Fresh build added to GearShift Society.",
      category: rideForm.category,
      image: rideForm.image,
      location: rideForm.location || "Worldwide",
      specs: {
        engine: rideForm.engine || "TBD",
        drivetrain: rideForm.drivetrain || "TBD",
        power: rideForm.power || "TBD",
        wheels: rideForm.wheels || "TBD"
      },
      mods: mods.length ? mods : ["Drop your mod list in the comments!"],
      featuredMods: featured.length ? featured : ["New Build"],
      socials: {
        instagram: rideForm.instagram || undefined,
        youtube: rideForm.youtube || undefined,
        tiktok: rideForm.tiktok || undefined
      }
    };

    setRides((prev) => [newRide, ...prev]);
    setRideForm(initialRideForm);
  };

  const submitMeetup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!meetupForm.title || !meetupForm.date || !meetupForm.location) return;

    const tags = meetupForm.tags
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const newMeetup: Meetup = {
      id: `${meetupForm.organizer.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      title: meetupForm.title,
      description: meetupForm.description || "New community meetup was just posted.",
      date: meetupForm.date,
      location: meetupForm.location,
      organizer: meetupForm.organizer || "Community Member",
      tags: tags.length ? tags : ["Community"],
      mapUrl: meetupForm.mapUrl || undefined
    };

    setMeetups((prev) => [newMeetup, ...prev]);
    setMeetupForm(initialMeetupForm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-white">
      <Header />
      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 pb-32 pt-16">
        <section className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
              <BoltIcon className="h-4 w-4 text-petrol-300" />
              Built for car people
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              GearShift Society
            </h1>
            <p className="max-w-xl text-lg text-slate-300">
              A digital pit lane where car guys, gearheads, and bike fanatics flex their builds, break down
              every nut-and-bolt mod, share meetups, and trade routes all night long.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-200">
              <a
                href="#share"
                className="inline-flex items-center gap-2 rounded-full bg-petrol-500 px-6 py-3 font-semibold text-white shadow-lg shadow-petrol-900/40 transition hover:bg-petrol-400"
              >
                <PlusIcon className="h-5 w-5" />
                Drop Your Build
              </a>
              <a
                href="#meetups"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-slate-200 hover:border-petrol-400 hover:text-white"
              >
                Upcoming Meets
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:grid-cols-2 lg:grid-cols-4">
              {communityStats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-semibold text-white">
                    {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-petrol-500/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70">
              <Image
                src="https://images.unsplash.com/photo-1549921296-3ec1bf31c9b7?auto=format&fit=crop&w=1400&q=80"
                alt="Car enthusiast community"
                width={900}
                height={700}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section id="rides" className="space-y-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-petrol-200">Garage Feed</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Featured Builds</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Static or static drop, AWD or chain drive — this is where every enthusiast showcases the
                story behind the machine.
              </p>
            </div>
            <div className="flex gap-3 text-xs text-slate-300">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">
                <RectangleStackIcon className="h-4 w-4 text-petrol-300" />
                {rides.length} active builds
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">
                <PhotoIcon className="h-4 w-4 text-petrol-300" />
                Daily uploads
              </span>
            </div>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {rides.map((ride) => (
              <RideCard key={ride.id} ride={ride} />
            ))}
          </div>
        </section>

        <section
          id="share"
          className="grid gap-12 rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 via-slate-900 to-petrol-950/40 p-10 lg:grid-cols-2"
        >
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.3em] text-petrol-200">Add Your Build</p>
            <h2 className="text-3xl font-semibold text-white">Upload Specs, Mods & Shots</h2>
            <p className="text-sm text-slate-300">
              Share the details that matter — full spec sheets, power curves, dyno numbers, wiring nerd-outs.
              Drop external media and connect with builders who get the obsession.
            </p>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-3">
                <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-petrol-300" />
                Get actionable feedback on your setup and tune.
              </li>
              <li className="flex items-center gap-3">
                <CursorArrowRaysIcon className="h-5 w-5 text-petrol-300" />
                Match with locals wrenching on similar platforms.
              </li>
              <li className="flex items-center gap-3">
                <RocketLaunchIcon className="h-5 w-5 text-petrol-300" />
                Showcase your ride on the front page highlight reel.
              </li>
            </ul>
          </div>
          <form onSubmit={submitRide} className="grid gap-4 text-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Build title" value={rideForm.title} onChange={handleRideInput("title")} required />
              <Input label="Owner handle" value={rideForm.owner} onChange={handleRideInput("owner")} required />
            </div>
            <Input
              label="Tagline"
              placeholder="Tell the community what makes it special"
              value={rideForm.tagline}
              onChange={handleRideInput("tagline")}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Category</span>
                <select
                  className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-petrol-400"
                  value={rideForm.category}
                  onChange={(event) =>
                    setRideForm((prev) => ({ ...prev, category: event.target.value as RideCategory }))
                  }
                >
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                  <option value="truck">Truck</option>
                </select>
              </label>
              <Input label="Location" value={rideForm.location} onChange={handleRideInput("location")} />
            </div>
            <Input
              label="Hero image URL"
              placeholder="https://"
              value={rideForm.image}
              onChange={handleRideInput("image")}
              required
            />
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Engine" value={rideForm.engine} onChange={handleRideInput("engine")} />
              <Input label="Drivetrain" value={rideForm.drivetrain} onChange={handleRideInput("drivetrain")} />
              <Input label="Power" value={rideForm.power} onChange={handleRideInput("power")} />
              <Input label="Wheels/Tires" value={rideForm.wheels} onChange={handleRideInput("wheels")} />
            </div>
            <TextArea
              label="Mods (comma separated)"
              placeholder="Coilovers, forged internals, …"
              value={rideForm.mods}
              onChange={handleRideInput("mods")}
            />
            <Input
              label="Featured tags (comma separated)"
              placeholder="Widebody, Air Ride, Track build"
              value={rideForm.featured}
              onChange={handleRideInput("featured")}
            />
            <div className="grid gap-4 md:grid-cols-3">
              <Input
                label="Instagram link"
                placeholder="https://instagram.com/yourbuild"
                value={rideForm.instagram}
                onChange={handleRideInput("instagram")}
              />
              <Input
                label="YouTube link"
                placeholder="https://youtube.com/@channel"
                value={rideForm.youtube}
                onChange={handleRideInput("youtube")}
              />
              <Input
                label="TikTok link"
                placeholder="https://tiktok.com/@handle"
                value={rideForm.tiktok}
                onChange={handleRideInput("tiktok")}
              />
            </div>
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-petrol-500 px-6 py-3 font-semibold text-white shadow-lg shadow-petrol-900/40 transition hover:bg-petrol-400"
            >
              Post Build
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </form>
        </section>

        <section id="mods" className="grid gap-6 rounded-3xl border border-white/10 bg-slate-900/70 p-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-petrol-200">Spec Sheets</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Build Snapshots</h2>
            <p className="mt-2 max-w-3xl text-sm text-slate-300">
              Browse quick-hit stats from crew favorites. Snapshots update live as owners tweak boost, gear
              ratios, aero, and more — it&apos;s like a digital pit wall.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rides.slice(0, 6).map((ride) => (
              <div
                key={`${ride.id}-specs`}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 shadow-inner"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{ride.title}</h3>
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-400">{ride.category}</span>
                </div>
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-petrol-200">
                  {ride.owner} • {ride.location}
                </p>
                <dl className="mt-4 space-y-3 text-sm text-slate-200">
                  <SpecRow label="Engine" value={ride.specs.engine} />
                  <SpecRow label="Power" value={ride.specs.power} />
                  <SpecRow label="Drivetrain" value={ride.specs.drivetrain} />
                  <SpecRow label="Wheels/Tires" value={ride.specs.wheels} />
                </dl>
                <div className="mt-4 flex flex-wrap gap-2">
                  {ride.mods.slice(0, 3).map((mod) => (
                    <span
                      key={mod}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                    >
                      {mod}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="meetups" className="space-y-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-petrol-200">Meetup Lab</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Upcoming Runs & Coffee Spots</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Cruise nights, canyon attacks, dyno days and wrench parties — drop a pin so the squad can pull
                up.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
              <h3 className="text-sm font-semibold text-white">Add your own meetup</h3>
              <p className="mt-1 text-xs text-slate-400">Post your next cruise or pop-up in seconds.</p>
              <form onSubmit={submitMeetup} className="mt-4 grid gap-3 text-xs text-white">
                <Input
                  label="Title"
                  value={meetupForm.title}
                  onChange={handleMeetupInput("title")}
                  required
                />
                <TextArea
                  label="Description"
                  value={meetupForm.description}
                  onChange={handleMeetupInput("description")}
                />
                <Input
                  label="Date & time"
                  type="datetime-local"
                  value={meetupForm.date}
                  onChange={handleMeetupInput("date")}
                  required
                />
                <Input
                  label="Location"
                  value={meetupForm.location}
                  onChange={handleMeetupInput("location")}
                  required
                />
                <Input
                  label="Organizer"
                  value={meetupForm.organizer}
                  onChange={handleMeetupInput("organizer")}
                />
                <Input
                  label="Map link"
                  placeholder="https://maps.google.com/?q=…"
                  value={meetupForm.mapUrl}
                  onChange={handleMeetupInput("mapUrl")}
                />
                <Input
                  label="Tags (comma separated)"
                  value={meetupForm.tags}
                  onChange={handleMeetupInput("tags")}
                />
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-2 font-semibold text-white transition hover:bg-petrol-500/80"
                >
                  Publish Meetup
                </button>
              </form>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {meetups.map((meetup) => (
              <MeetupCard key={meetup.id} meetup={meetup} />
            ))}
          </div>
        </section>

        <section
          id="connect"
          className="grid gap-6 rounded-3xl border border-white/10 bg-gradient-to-r from-petrol-900/60 via-slate-950/60 to-slate-950/80 p-10 lg:grid-cols-3"
        >
          <div className="lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.3em] text-petrol-200">Connect</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Plug into the GearShift Network</h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-300">
              Sync up with fabricators, detailers, tuners, videographers, and road captains. Drop your build
              thread, slide into AMAs, or spin up a spontaneous night run.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <ConnectCard
                title="Discord Paddock"
                description="Live wrench cams, ECU tune sessions, vendor drops, exclusive vinyl packs."
                href="https://discord.com"
              />
              <ConnectCard
                title="Meetup Locator"
                description="Geo-tag meetups, mark safe spots, embed preferred cruise loops."
                href="#meetups"
              />
              <ConnectCard
                title="Builder Spotlight"
                description="Submit your build for a deep-dive feature on the front-page and socials."
                href="#share"
              />
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
            <h3 className="text-lg font-semibold text-white">Crew Etiquette</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>Zero tolerance for reckless location leaks.</li>
              <li>Respect platform diversity — stance, track, drift, ADV, everything goes.</li>
              <li>When in doubt, bring torque specs and dyno charts.</li>
              <li>Signal boost new builders and uplift the next generation.</li>
            </ul>
            <a
              href="mailto:garage@gearshift.society"
              className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full border border-petrol-500/60 text-sm font-semibold text-petrol-200 hover:border-petrol-400 hover:text-white"
            >
              Collab with us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function Input({ label, className, ...props }: InputProps) {
  return (
    <label className="grid gap-2">
      <span className="text-xs uppercase tracking-[0.3em] text-slate-400">{label}</span>
      <input
        className={`rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-petrol-400 ${className ?? ""}`}
        {...props}
      />
    </label>
  );
}

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

function TextArea({ label, className, rows = 3, ...props }: TextAreaProps) {
  return (
    <label className="grid gap-2">
      <span className="text-xs uppercase tracking-[0.3em] text-slate-400">{label}</span>
      <textarea
        rows={rows}
        className={`rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-petrol-400 ${className ?? ""}`}
        {...props}
      />
    </label>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">{label}</dt>
      <dd className="mt-1 text-sm text-slate-100">{value}</dd>
    </div>
  );
}

type ConnectCardProps = {
  title: string;
  description: string;
  href: string;
};

function ConnectCard({ title, description, href }: ConnectCardProps) {
  return (
    <a
      href={href}
      className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:border-petrol-400 hover:bg-petrol-500/10"
    >
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="text-sm text-slate-300">{description}</p>
      <span className="text-xs uppercase tracking-[0.3em] text-petrol-200">Tap in</span>
    </a>
  );
}
