import { Reveal } from "@/components/motion/Reveal";
import { AppImage } from "@/components/ui/AppImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import type { ImageAsset } from "@/types/image";

interface PlanCtaProps {
  image: ImageAsset;
  subject?: string;
}

export function PlanCta({ image, subject }: PlanCtaProps) {
  return (
    <section className="container-x pb-section">
      <Reveal className="grid overflow-hidden rounded-[32px] bg-paper md:grid-cols-2">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <p className="eyebrow text-saffron">Ready when you are</p>
          <h2 className="mt-3 text-display-lg">
            Let&apos;s plan your <em>journey.</em>
          </h2>
          <p className="mt-5 max-w-md text-slate">
            Tell us when you want to travel and what you hope to feel. A trip designer replies within a
            day — usually much sooner on WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
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
        <div className="relative aspect-4/3 md:aspect-auto md:min-h-[28rem]">
          <AppImage image={image} sizes="(min-width: 768px) 40rem, 100vw" />
        </div>
      </Reveal>
    </section>
  );
}
