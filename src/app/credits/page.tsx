import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { getDestinations } from "@/lib/data/destinations";
import { getAllCredits } from "@/lib/data/images";

export const metadata: Metadata = {
  title: "Photo credits",
  description: "Credits and licences for the photographs used on Lots of Trip.",
  alternates: { canonical: "/credits" },
};

export default function CreditsPage() {
  const names = new Map(getDestinations().map((item) => [item.slug, item.name]));
  const credits = getAllCredits();

  return (
    <>
      <PageHeader
        eyebrow="Photo credits"
        title="Thank you, photographers."
        description="Destination photographs are sourced from Wikimedia Commons under open licences. Each is credited below with a link to the original."
      />
      <section className="container-x pb-section">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[24px] bg-paper">
          <ul className="divide-y divide-line">
            {credits.map((credit) => (
              <li key={credit.src} className="grid gap-1 px-6 py-4 text-[14px] sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-6">
                <span className="font-medium">{names.get(credit.destination) ?? credit.destination}</span>
                <span className="text-slate">
                  <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent">
                    {credit.title}
                  </a>{" "}
                  by {credit.artist}
                </span>
                <a
                  href={credit.licenseUrl || credit.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-accent hover:underline"
                >
                  {credit.license}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
