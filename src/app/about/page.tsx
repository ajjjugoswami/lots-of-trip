import type { Metadata } from "next";
import { AboutStory } from "@/components/sections/about/AboutStory";
import { AboutValues } from "@/components/sections/about/AboutValues";
import { TeamGrid } from "@/components/sections/about/TeamGrid";
import { Manifesto } from "@/components/sections/home/Manifesto";
import { PlanCta } from "@/components/sections/shared/PlanCta";
import { PageHeader } from "@/components/ui/PageHeader";
import { resolveImage } from "@/lib/data/images";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Lots of Trip is a small team from Dehradun planning journeys across Uttarakhand and Himachal — local drivers, handpicked stays and real support on every day.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title={
          <>
            Travel the hills with people who <em>live</em> in them.
          </>
        }
        description="We are a small Dehradun team that plans trips across Uttarakhand and Himachal the way we would want them planned for our own families."
      />
      <AboutStory image={resolveImage({ destination: "mussoorie", index: 0 }, "Mussoorie hills")} />
      <AboutValues />
      <Manifesto />
      <TeamGrid />
      <PlanCta image={resolveImage({ destination: "rishikesh", index: 0 }, "Rishikesh")} />
    </>
  );
}
