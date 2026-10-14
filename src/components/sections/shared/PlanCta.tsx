import { RevealText } from "@/components/motion/RevealText";
import { AppImage } from "@/components/ui/AppImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WhatsAppIcon } from "@/components/ui/icons";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import type { ImageAsset } from "@/types/image";

interface PlanCtaProps {
  image: ImageAsset;
  subject?: string;
}

export function PlanCta({ image, subject }: PlanCtaProps) {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div className="container-x py-section text-center">
        <p className="eyebrow mb-10 text-slate">Ready when you are</p>
        <RevealText as="h2" className="mx-auto max-w-[14ch] font-display text-display-xl">
          Let&apos;s plan your journey into the mountains
        </RevealText>

        <div className="mx-auto mt-12 h-28 w-48 overflow-hidden rounded-full md:h-36 md:w-72">
          <div className="relative size-full">
            <AppImage image={image} sizes="18rem" />
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-md text-slate">
          Tell us when you want to travel and what you hope to feel. A trip designer replies within a
          day — usually much sooner on WhatsApp.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/contact">Plan my trip</ButtonLink>
          <ButtonLink
            href={buildWhatsAppLink(subject)}
            external
            variant="outline"
            icon={<WhatsAppIcon className="size-4" />}
          >
            Chat on WhatsApp
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
