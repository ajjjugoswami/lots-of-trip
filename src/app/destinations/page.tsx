import type { Metadata } from "next";
import { Suspense } from "react";
import { DestinationExplorer } from "@/components/sections/destinations/DestinationExplorer";
import { DestinationGrid } from "@/components/sections/destinations/DestinationGrid";
import { DestinationMap } from "@/components/sections/map/DestinationMap";
import { PlanCta } from "@/components/sections/shared/PlanCta";
import { PageHeader } from "@/components/ui/PageHeader";
import { getDestinations } from "@/lib/data/destinations";
import { getMapData } from "@/lib/data/map";
import { resolveImage } from "@/lib/data/images";
import { getWeatherForAll } from "@/lib/weather/getWeather";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore Shimla, Manali, Rishikesh, Nainital, Jim Corbett, Kasol, Dharamshala and more — handpicked destinations across Uttarakhand and Himachal Pradesh.",
  alternates: { canonical: "/destinations" },
};

export default async function DestinationsPage() {
  const destinations = getDestinations();
  const weather = await getWeatherForAll(destinations);

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
          <DestinationExplorer destinations={destinations} weather={weather} />
        </Suspense>
      </section>
      <DestinationMap data={getMapData(weather)} />
      <PlanCta image={resolveImage({ destination: "shimla", index: 0 }, "Shimla in winter")} />
    </>
  );
}
