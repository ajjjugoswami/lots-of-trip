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
import { testimonials } from "@/content/testimonials";
import {
  getDestination,
  getDestinations,
  getDestinationsByType,
  getStateHeroImage,
  getStates,
} from "@/lib/data/destinations";
import { resolveImage } from "@/lib/data/images";
import { getFeaturedTours } from "@/lib/data/tours";

const GALLERY_SLUGS = [
  "kedarnath",
  "spiti-valley",
  "valley-of-flowers",
  "chandratal",
  "auli",
  "kinnaur",
  "chopta-tungnath",
  "dharamshala",
  "munsiyari",
  "hampta-pass",
];

const INSTAGRAM_REFS = [
  { destination: "valley-of-flowers", index: 2 },
  { destination: "spiti-valley", index: 3 },
  { destination: "kedarkantha", index: 1 },
  { destination: "chandratal", index: 3 },
  { destination: "kausani", index: 0 },
  { destination: "bir-billing", index: 0 },
];

export default function HomePage() {
  const destinations = getDestinations();
  const galleryDestinations = GALLERY_SLUGS.map(getDestination).filter((item) => item !== undefined);
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
      <Hero image={resolveImage({ destination: "spiti-valley", index: 0 }, "Key Monastery, Spiti")} />
      <Manifesto />
      <TwoStates panels={statePanels} />
      <DestinationGallery destinations={galleryDestinations} total={destinations.length} />
      <FeaturedTours tours={getFeaturedTours()} />
      <SeasonStrip destinations={destinations} />
      <ExperienceGrid items={experienceItems} />
      <Testimonials items={testimonials} />
      <InstagramStrip images={INSTAGRAM_REFS.map((ref) => resolveImage(ref, "Lots of Trip on Instagram"))} />
      <PlanCta image={resolveImage({ destination: "chandratal", index: 0 }, "Chandratal lake")} />
    </>
  );
}
