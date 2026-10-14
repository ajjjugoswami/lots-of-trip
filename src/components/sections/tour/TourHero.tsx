import { CalendarDays, Gauge, IndianRupee, Users } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { AppImage } from "@/components/ui/AppImage";
import { difficultyLabel, formatINR } from "@/lib/utils/format";
import type { Tour } from "@/types/tour";

export function TourHero({ tour, places }: { tour: Tour; places: string[] }) {
  const facts = [
    { Icon: CalendarDays, label: "Duration", value: `${tour.durationDays} days` },
    { Icon: Gauge, label: "Level", value: difficultyLabel(tour.difficulty) },
    { Icon: Users, label: "Group", value: tour.groupSize },
    { Icon: IndianRupee, label: "From", value: `${formatINR(tour.priceFromINR)} pp` },
  ];

  return (
    <section className="container-x pt-14 md:pt-20">
      <Reveal onLoad className="mx-auto max-w-3xl text-center">
        <p className="eyebrow text-saffron">{places.join(" · ")}</p>
        <h1 className="mt-3 text-display-xl">{tour.title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lead text-slate">{tour.summary}</p>
      </Reveal>

      <div className="relative mt-12 aspect-4/3 overflow-hidden rounded-[28px] bg-paper sm:aspect-16/9 md:mt-16 md:rounded-[36px] lg:aspect-21/9">
        <AppImage image={tour.cover} sizes="(min-width: 1312px) 1216px, 100vw" preload />
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] bg-line md:grid-cols-4">
        {facts.map(({ Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 bg-paper px-5 py-5">
            <Icon className="size-5 shrink-0 text-accent" aria-hidden />
            <div>
              <dt className="text-[12px] text-slate">{label}</dt>
              <dd className="text-[15px] font-semibold">{value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
