import { CalendarDays, MapPin, Mountain } from "lucide-react";
import { ViewTransition } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { AppImage } from "@/components/ui/AppImage";
import { formatAltitude, formatMonthRange } from "@/lib/utils/format";
import type { Destination } from "@/types/destination";

export function DestinationHero({ destination }: { destination: Destination }) {
  const facts = [
    { Icon: MapPin, text: destination.region },
    { Icon: Mountain, text: formatAltitude(destination.altitudeM) },
    { Icon: CalendarDays, text: formatMonthRange(destination.bestMonths) },
  ];

  return (
    <section className="container-x pt-14 md:pt-20">
      <Reveal onLoad className="mx-auto max-w-3xl text-center">
        <p className="eyebrow text-saffron">{destination.region}</p>
        <h1 className="mt-3 text-display-xl">{destination.name}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lead text-slate">{destination.tagline}</p>
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-2">
          {facts.map(({ Icon, text }) => (
            <li key={text} className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3.5 py-1.5 text-[13px] text-ink-soft">
              <Icon className="size-3.5 text-slate" aria-hidden />
              {text}
            </li>
          ))}
        </ul>
      </Reveal>

      <ViewTransition name={`destination-${destination.slug}`} share="morph" default="none">
        <div className="relative mt-12 aspect-4/3 overflow-hidden rounded-[28px] bg-paper sm:aspect-16/9 md:mt-16 md:rounded-[36px] lg:aspect-21/9">
          <AppImage image={destination.images[0]} sizes="(min-width: 1312px) 1216px, 100vw" preload />
        </div>
      </ViewTransition>
    </section>
  );
}
