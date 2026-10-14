import { Reveal } from "@/components/motion/Reveal";
import { AppImage } from "@/components/ui/AppImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { ImageAsset } from "@/types/image";
import { TripFinder } from "./TripFinder";

interface HeroProps {
  image: ImageAsset;
  caption: string;
  destinations: { slug: string; name: string }[];
}

export function Hero({ image, caption, destinations }: HeroProps) {
  return (
    <section className="relative isolate flex flex-col overflow-hidden bg-night text-white md:min-h-svh">
      <div className="absolute inset-0 -z-10 animate-[ken-burns_18s_var(--ease-out-expo)_both]">
        <AppImage image={image} sizes="100vw" preload alt={caption} />
      </div>
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/60 via-black/35 to-black/80 md:from-black/55 md:via-black/10 md:to-black/75" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/45 via-transparent to-transparent" />

      <div className="container-x flex flex-1 flex-col justify-end pt-24 pb-6 sm:pt-32 md:pt-36 md:pb-12">
        <Reveal onLoad>
          <p className="eyebrow text-[#f0d3a0] [text-shadow:0_1px_12px_rgb(0_0_0/0.5)]">Uttarakhand · Himachal Pradesh</p>
        </Reveal>
        <Reveal onLoad delay={0.1}>
          <h1 className="mt-3 max-w-4xl text-display-2xl sm:mt-5 [text-shadow:0_2px_24px_rgb(0_0_0/0.45)]">
            Where the Himalaya <em className="text-[#f0d3a0]">begins.</em>
          </h1>
        </Reveal>
        <Reveal onLoad delay={0.2}>
          <p className="mt-4 max-w-xl text-lead text-white/90 [text-shadow:0_1px_16px_rgb(0_0_0/0.45)] sm:mt-6">
            Private journeys and small-group trips across the hills — planned by people who grew up
            beneath these peaks.
          </p>
        </Reveal>
        <Reveal onLoad delay={0.3} className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-9 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
          <ButtonLink href="/tours" variant="light">
            Explore journeys
          </ButtonLink>
          <ButtonLink href="/destinations" variant="glass">
            Destinations
          </ButtonLink>
        </Reveal>

        <Reveal onLoad delay={0.45} className="mt-8 sm:mt-12 md:mt-16">
          <TripFinder destinations={destinations} />
        </Reveal>
        <p className="mt-5 text-right text-[11px] tracking-[0.18em] text-white/55 uppercase">{caption}</p>
      </div>
    </section>
  );
}
