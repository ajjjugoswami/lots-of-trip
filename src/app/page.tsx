import { DestinationGallery } from "@/components/sections/home/DestinationGallery";
import { ExperienceGrid } from "@/components/sections/home/ExperienceGrid";
import { FeaturedTours } from "@/components/sections/home/FeaturedTours";
import { Hero } from "@/components/sections/home/Hero";
import { InstagramStrip } from "@/components/sections/home/InstagramStrip";
import { Manifesto } from "@/components/sections/home/Manifesto";
import { SeasonStrip } from "@/components/sections/home/SeasonStrip";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { TwoStates } from "@/components/sections/home/TwoStates";
import { PlanCta } from "@/components/sections/shared/PlanCta";
import { experiences } from "@/content/experiences";
import { heroSlides } from "@/content/hero";
import { testimonials } from "@/content/testimonials";
import {
  getDestinations,
  getDestinationsByType,
  getStateHeroImage,
  getStates,
} from "@/lib/data/destinations";
import { resolveImage } from "@/lib/data/images";
import { getFeaturedTours } from "@/lib/data/tours";

const INSTAGRAM_REFS = [
  { destination: "manali", index: 1 },
  { destination: "amritsar", index: 1 },
  { destination: "jibhi", index: 0 },
  { destination: "kasol", index: 0 },
  { destination: "shimla", index: 0 },
  { destination: "dharamshala", index: 0 },
];

export default function HomePage() {
  const destinations = getDestinations();
  const statePanels = getStates().map((state) => ({
    ...state,
    image: getStateHeroImage(state.slug),
  }));
  const experienceItems = experiences.map((experience) => ({
    ...experience,
    count: getDestinationsByType(experience.type).length,
    image: resolveImage(experience.image, experience.label),
  }));

  return (
    <>
      <Hero
        slides={heroSlides.map((slide) => ({ caption: slide.caption, image: resolveImage(slide.image, slide.caption) }))}
        destinations={destinations.map(({ slug, name, region, state }) => ({ slug, name, region, state }))}
      />
      <Manifesto />
      <TwoStates panels={statePanels} />
      <DestinationGallery destinations={destinations} total={destinations.length} />
      <FeaturedTours tours={getFeaturedTours()} />
      <SeasonStrip destinations={destinations} />
      <ExperienceGrid items={experienceItems} />
      <Testimonials items={testimonials} />
      <InstagramStrip images={INSTAGRAM_REFS.map((ref) => resolveImage(ref, "Lots of Trip on Instagram"))} />
      <PlanCta image={resolveImage({ destination: "dalhousie", index: 0 }, "Khajjiar meadow, Dalhousie")} />
    </>
  );
}
