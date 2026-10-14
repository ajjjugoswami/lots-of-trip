import type { Metadata } from "next";
import { PlanCta } from "@/components/sections/shared/PlanCta";
import { TourGrid } from "@/components/sections/shared/TourGrid";
import { PageHeader } from "@/components/ui/PageHeader";
import { resolveImage } from "@/lib/data/images";
import { getTours } from "@/lib/data/tours";

export const metadata: Metadata = {
  title: "Journeys",
  description:
    "Ready-made itineraries across Uttarakhand and Himachal — Shimla & Manali, Haridwar & Rishikesh, Nainital & Corbett, Kasol & Jibhi and more. Fully customisable.",
  alternates: { canonical: "/tours" },
};

export default function ToursPage() {
  return (
    <>
      <PageHeader
        eyebrow="Journeys"
        title={
          <>
            Itineraries, <em>ready to go.</em>
          </>
        }
        description="Start from one of our tried-and-tested journeys and we will tailor the dates, hotels and pace to you."
      />
      <section className="container-x pb-section">
        <TourGrid tours={getTours()} />
      </section>
      <PlanCta image={resolveImage({ destination: "dharamshala", index: 0 }, "Triund ridge")} />
    </>
  );
}
