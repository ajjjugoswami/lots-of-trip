import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { team } from "@/content/about";

export function TeamGrid() {
  return (
    <section className="container-x py-section">
      <SectionIntro align="center" label="The team" title="The people who plan your trip." />
      <Reveal stagger className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-5 md:grid-cols-4">
        {team.map((member) => (
          <RevealItem key={member.name} className="text-center">
            <div className="mx-auto grid aspect-square w-full max-w-44 place-items-center rounded-full bg-paper font-serif-display text-display-md text-slate">
              {member.initials}
            </div>
            <h3 className="mt-4 text-[17px] tracking-tight">{member.name}</h3>
            <p className="text-[14px] text-slate">{member.role}</p>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
