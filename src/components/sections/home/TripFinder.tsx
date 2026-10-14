"use client";

import { ArrowRight, CalendarDays, ChevronDown, MapPin, Users } from "lucide-react";
import { useState, type ComponentType, type ReactNode, type SVGProps } from "react";
import { MONTHS } from "@/lib/utils/format";
import { buildWhatsAppMessageLink } from "@/lib/utils/whatsapp";

interface TripFinderProps {
  destinations: { slug: string; name: string }[];
}

const TRAVELLERS = ["1", "2", "3–4", "5–8", "9+"];

function Field({
  Icon,
  label,
  children,
}: {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="group relative flex flex-1 items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3.5 md:py-2">
      <Icon className="size-4 shrink-0 text-[#d4b483]" aria-hidden />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-[10px] font-medium tracking-[0.2em] text-white/60 uppercase">{label}</span>
        {children}
      </span>
      <ChevronDown className="pointer-events-none size-4 shrink-0 text-white/60" aria-hidden />
    </label>
  );
}

const SELECT_CLASS =
  "w-full cursor-pointer appearance-none bg-transparent text-[14px] text-white outline-none sm:text-[15px] [&>option]:text-[#1c1b19]";

export function TripFinder({ destinations }: TripFinderProps) {
  const [destination, setDestination] = useState("");
  const [month, setMonth] = useState("");
  const [travellers, setTravellers] = useState("2");

  const place = destinations.find((item) => item.slug === destination)?.name ?? "Uttarakhand or Himachal";
  const message = `Hi Lots of Trip! I'd like to plan a trip to ${place}${month ? ` in ${month}` : ""} for ${travellers} ${travellers === "1" ? "traveller" : "travellers"}.`;

  return (
    <div className="flex flex-col divide-y divide-white/15 overflow-hidden rounded-xl bg-black/25 p-1.5 ring-1 ring-white/20 backdrop-blur-xl md:flex-row md:items-center md:divide-x md:divide-y-0 md:rounded-full">
      <Field Icon={MapPin} label="Destination">
        <select value={destination} onChange={(event) => setDestination(event.target.value)} className={SELECT_CLASS}>
          <option value="">Anywhere in the hills</option>
          {destinations.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </Field>
      <Field Icon={CalendarDays} label="When">
        <select value={month} onChange={(event) => setMonth(event.target.value)} className={SELECT_CLASS}>
          <option value="">Flexible</option>
          {MONTHS.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </Field>
      <Field Icon={Users} label="Travellers">
        <select value={travellers} onChange={(event) => setTravellers(event.target.value)} className={SELECT_CLASS}>
          {TRAVELLERS.map((value) => (
            <option key={value} value={value}>
              {value} {value === "1" ? "traveller" : "travellers"}
            </option>
          ))}
        </select>
      </Field>
      <a
        href={buildWhatsAppMessageLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="group m-1.5 inline-flex h-12 items-center md:h-13 justify-center gap-2 rounded-full bg-white px-7 text-[12px] font-medium tracking-[0.16em] text-[#1c1b19] uppercase transition-colors duration-300 hover:bg-[#d4b483] md:m-0"
      >
        Plan my trip
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
      </a>
    </div>
  );
}
