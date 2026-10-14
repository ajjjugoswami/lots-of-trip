import { Clock, MapPin, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { ContactChannels } from "@/components/sections/contact/ContactChannels";
import { EmbeddedForm } from "@/components/ui/EmbeddedForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/content/site";

const DESCRIPTION =
  "Plan a trip to Uttarakhand or Himachal with Lots of Trip. Tell us where and when — a trip designer replies within a day, usually much sooner on WhatsApp.";

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
};

const PROMISES = [
  { Icon: Clock, text: "Reply within one working day" },
  { Icon: ShieldCheck, text: "No spam, no mailing list" },
  { Icon: MapPin, text: "Planned by locals in Dehradun" },
];

export default function ContactPage() {
  const { contact } = siteConfig;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s plan your <em>trip.</em>
          </>
        }
        description="Tell us where you want to go, when, and who's coming along. A real person reads every message — no bots, no call centre."
      >
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {PROMISES.map(({ Icon, text }) => (
            <li key={text} className="flex items-center gap-2 text-[14px] text-slate">
              <Icon className="size-4 shrink-0 text-accent" aria-hidden />
              {text}
            </li>
          ))}
        </ul>
      </PageHeader>

      <section className="container-x pb-section">
        <div className="mx-auto max-w-3xl">
          <EmbeddedForm src={siteConfig.contactFormSrc} title="Get in touch" eager />
          <p className="mt-5 text-center text-[14px] text-slate">
            Prefer email? Write to{" "}
            <a href={`mailto:${contact.email}`} className="text-accent hover:underline">
              {contact.email}
            </a>{" "}
            — it reaches the same team.
          </p>
        </div>

        <div className="mx-auto mt-20 max-w-3xl border-t border-line pt-12">
          <h2 className="text-center text-display-md">Might be faster</h2>
          <div className="mt-8">
            <ContactChannels />
          </div>
          <p className="mt-8 text-center text-[13px] text-slate">{contact.address}</p>
        </div>
      </section>
    </>
  );
}
