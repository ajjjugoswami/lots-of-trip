import { Check, Newspaper } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { formatAltitude, formatCoordinates, formatMonthRange, tripTypeLabel } from "@/lib/utils/format";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import type { Destination } from "@/types/destination";

/** Builds a Google News search URL for the given destination name. */
function buildGoogleNewsLink(destinationName: string): string {
  const query = encodeURIComponent(`${destinationName} travel news`);
  return `https://news.google.com/search?q=${query}&hl=en-IN&gl=IN&ceid=IN:en`;
}

export function DestinationOverview({ destination }: { destination: Destination }) {
  const facts = [
    { label: "Region", value: destination.region },
    { label: "Altitude", value: formatAltitude(destination.altitudeM) },
    { label: "Best time", value: formatMonthRange(destination.bestMonths) },
    { label: "Good for", value: destination.types.map(tripTypeLabel).join(", ") },
    { label: "Coordinates", value: formatCoordinates(destination.coordinates) },
  ];

  return (
    <section className="container-x py-section">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow text-saffron">Overview</p>
          <h2 className="mt-3 text-display-md">About {destination.name}</h2>
          <p className="mt-5 text-lead text-slate">{destination.description}</p>

          <h3 className="mt-12 text-xl tracking-tight">Highlights</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {destination.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 rounded-2xl bg-paper p-4 text-[15px]">
                <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                {highlight}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="rounded-xl bg-paper p-7 md:p-8 lg:sticky lg:top-20">
            <h3 className="text-lg tracking-tight">At a glance</h3>
            <dl className="mt-5 divide-y divide-line">
              {facts.map((fact) => (
                <div key={fact.label} className="flex justify-between gap-6 py-3 text-[14px]">
                  <dt className="text-slate">{fact.label}</dt>
                  <dd className="text-right font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-7 flex flex-col gap-3">
              <ButtonLink href="/contact">Plan a trip to {destination.name}</ButtonLink>
              <ButtonLink
                href={buildWhatsAppLink(destination.name)}
                external
                variant="outline"
                icon={<FaWhatsapp className="size-4 text-[#25d366]" />}
              >
                Ask on WhatsApp
              </ButtonLink>
              <ButtonLink
                href={buildGoogleNewsLink(destination.name)}
                external
                variant="outline"
                icon={<Newspaper className="size-4" />}
              >
                Latest news from {destination.name}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
