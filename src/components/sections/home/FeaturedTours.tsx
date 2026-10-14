import { TourRow } from "@/components/cards/TourRow";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { padIndex } from "@/lib/utils/format";
import type { Tour } from "@/types/tour";

export function FeaturedTours({ tours }: { tours: Tour[] }) {
  return (
    <section className="container-x py-section">
      <SectionIntro
        index="05"
        label="Signature journeys"
        title={
          <>
            Itineraries shaped by <em className="italic">altitude</em>, season and pace
          </>
        }
        aside={
          <p className="text-slate">
            Every journey is led by a local trip lead, paced for acclimatisation and kept small —
            never more than sixteen travellers.
          </p>
        }
      />
      <div className="mt-20 space-y-28 md:mt-32 md:space-y-40">
        {tours.map((tour, index) => (
          <TourRow key={tour.slug} tour={tour} index={padIndex(index)} reverse={index % 2 === 1} />
        ))}
      </div>
      <div className="mt-24 flex justify-center">
        <ButtonLink href="/tours">All journeys</ButtonLink>
      </div>
    </section>
  );
}
