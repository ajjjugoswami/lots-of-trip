import { Check, Newspaper, Share2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MiniMap } from "@/components/ui/MiniMap";
import { ShareButton } from "@/components/ui/ShareButton";
import { formatAltitude, formatCoordinates, formatMonthRange, tripTypeLabel } from "@/lib/utils/format";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import type { Destination } from "@/types/destination";

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
          <div className="rounded-xl bg-paper lg:sticky lg:top-20">
            {/* Map */}
            <div className="overflow-hidden rounded-t-xl">
              <MiniMap coordinates={destination.coordinates} name={destination.name} />
            </div>

            <div className="p-6 md:p-7">
              {/* Facts */}
              <h3 className="text-[13px] font-semibold tracking-[0.1em] text-slate uppercase">
                At a glance
              </h3>
              <dl className="mt-4 divide-y divide-line">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex justify-between gap-6 py-2.5 text-[13px]">
                    <dt className="text-slate">{fact.label}</dt>
                    <dd className="text-right font-medium">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              {/* Primary CTA */}
              <ButtonLink href="/contact" className="mt-6 w-full">
                Plan a trip to {destination.name}
              </ButtonLink>

              {/* Secondary actions — 2-col icon + label */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <ButtonLink
                  href={buildWhatsAppLink(destination.name)}
                  external
                  variant="outline"
                  icon={<FaWhatsapp className="size-4 text-[#25d366]" />}
                >
                  WhatsApp
                </ButtonLink>
                <ShareButton
                  title={destination.name}
                  text={destination.tagline}
                  icon={<Share2 className="size-4" />}
                  label="Share"
                />
              </div>

              {/* Tertiary — text link */}
              <a
                href={buildGoogleNewsLink(destination.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-1.5 text-[12px] text-slate transition-colors hover:text-ink"
              >
                <Newspaper className="size-3.5" aria-hidden />
                Latest news from {destination.name}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
