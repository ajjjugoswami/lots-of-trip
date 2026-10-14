import { TourCard } from "@/components/cards/TourCard";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { Tour } from "@/types/tour";

export function FeaturedTours({ tours }: { tours: Tour[] }) {
  return (
    <section className="container-x py-section">
      <SectionIntro
        label="Signature journeys"
        title={
          <>
            Itineraries shaped by <em>altitude</em>, season and pace.
          </>
        }
        description="Led by local trip leads, paced for acclimatisation, never more than sixteen travellers."
        action={
          <ButtonLink href="/tours" variant="link">
            All journeys
          </ButtonLink>
        }
      />
      <Reveal stagger className="mt-12 grid gap-6 md:grid-cols-2">
        {tours.map((tour) => (
          <RevealItem key={tour.slug}>
            <TourCard tour={tour} />
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
