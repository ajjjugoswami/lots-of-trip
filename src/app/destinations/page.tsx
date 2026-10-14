import type { Metadata } from "next";
import { Suspense } from "react";
import { DestinationExplorer } from "@/components/sections/destinations/DestinationExplorer";
import { DestinationGrid } from "@/components/sections/destinations/DestinationGrid";
import { PlanCta } from "@/components/sections/shared/PlanCta";
import { PageHeader } from "@/components/ui/PageHeader";
import { getDestinations } from "@/lib/data/destinations";
import { resolveImage } from "@/lib/data/images";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore Shimla, Manali, Rishikesh, Nainital, Jim Corbett, Kasol, Dharamshala and more — handpicked destinations across Uttarakhand and Himachal Pradesh.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsPage() {
  const destinations = getDestinations();

  return (
    <>
      <PageHeader
        eyebrow="Destinations"
        title={
          <>
            Where do you want to <em>go?</em>
          </>
        }
        description={`${destinations.length} places across Uttarakhand and Himachal — from Ganga ghats and lake towns to snow valleys and Tibetan monasteries.`}
      />
      <section className="container-x pb-section">
        <Suspense fallback={<DestinationGrid destinations={destinations} />}>
          <DestinationExplorer destinations={destinations} />
        </Suspense>
      </section>
      <PlanCta image={resolveImage({ destination: "shimla", index: 0 }, "Shimla in winter")} />
    </>
  );
}
