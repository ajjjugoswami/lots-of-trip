import { Reveal } from "@/components/motion/Reveal";
import { AppImage } from "@/components/ui/AppImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { ImageAsset } from "@/types/image";
import { HeroImage } from "./HeroImage";

export function Hero({ image }: { image: ImageAsset }) {
  return (
    <section className="overflow-hidden bg-black pt-32 pb-16 text-paper md:pt-40 md:pb-24">
      <div className="container-x text-center">
        <Reveal onLoad>
          <p className="eyebrow text-saffron">Uttarakhand · Himachal Pradesh</p>
        </Reveal>
        <Reveal onLoad delay={0.08}>
          <h1 className="mx-auto mt-4 max-w-4xl text-display-2xl">
            Where the Himalaya <em>begins.</em>
          </h1>
        </Reveal>
        <Reveal onLoad delay={0.16}>
          <p className="mx-auto mt-6 max-w-2xl text-lead text-white/65">
            Small-group treks, pilgrimages and slow road journeys — planned by people who grew up
            beneath these peaks.
          </p>
        </Reveal>
        <Reveal onLoad delay={0.24} className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <ButtonLink href="/contact">Plan your trip</ButtonLink>
          <ButtonLink href="/destinations" variant="link-light">
            Explore destinations
          </ButtonLink>
        </Reveal>
      </div>

      <div className="container-x mt-14 md:mt-20">
        <HeroImage>
          <AppImage
            image={image}
            sizes="(min-width: 1312px) 1216px, 100vw"
            preload
            alt="Key Monastery above the Spiti river, covered in winter snow"
          />
        </HeroImage>
        <p className="mt-4 text-center text-[13px] text-white/45">Key Monastery, Spiti Valley · 4,166 m</p>
      </div>
    </section>
  );
}
