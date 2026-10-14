import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DestinationGrid } from "@/components/sections/destinations/DestinationGrid";
import { PlanCta } from "@/components/sections/shared/PlanCta";
import { TourGrid } from "@/components/sections/shared/TourGrid";
import { StateHero } from "@/components/sections/state/StateHero";
import { getDestinationsByState, getState, getStateHeroImage, getStates } from "@/lib/data/destinations";
import { getTours } from "@/lib/data/tours";

export function generateStaticParams() {
  return getStates().map((state) => ({ state: state.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journeys/[state]">): Promise<Metadata> {
  const { state: slug } = await params;
  const state = getState(slug);
  if (!state) return {};
  return {
    title: `${state.name} trips & destinations`,
    description: state.description,
    alternates: { canonical: `/journeys/${state.slug}` },
  };
}

export default async function StatePage({ params }: PageProps<"/journeys/[state]">) {
  const { state: slug } = await params;
  const state = getState(slug);
  if (!state) notFound();

  const destinations = getDestinationsByState(state.slug);
  const slugs = new Set(destinations.map((item) => item.slug));
  const tours = getTours().filter((tour) => tour.destinations.some((item) => slugs.has(item)));

  return (
    <>
      <StateHero state={state} image={getStateHeroImage(state.slug)} />
      <section className="container-x py-section">
        <h2 className="text-display-md">Destinations in {state.name}</h2>
        <div className="mt-8">
          <DestinationGrid destinations={destinations} />
        </div>
      </section>
      {tours.length > 0 && (
        <section className="container-x pb-section">
          <h2 className="text-display-md">{state.name} journeys</h2>
          <div className="mt-8">
            <TourGrid tours={tours} />
          </div>
        </section>
      )}
      <PlanCta image={destinations[1]?.images[0] ?? destinations[0].images[0]} subject={`a trip to ${state.name}`} />
    </>
  );
}
