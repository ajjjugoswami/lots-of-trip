import { Reveal, RevealItem } from "@/components/motion/Reveal";

const STATS = [
  { value: "24", label: "Destinations we know by heart" },
  { value: "8", label: "Signature journeys" },
  { value: "4,551 m", label: "Highest pass we cross" },
  { value: "1,200+", label: "Happy travellers" },
];

export function Manifesto() {
  return (
    <section className="container-x py-section text-center">
      <Reveal>
        <p className="eyebrow text-saffron">Who we are</p>
        <p className="mx-auto mt-5 max-w-4xl text-display-md font-semibold text-balance">
          A small team from Dehradun who believe the Himalaya should be travelled slowly —{" "}
          <span className="text-slate">on foot where possible, with locals always, and never in a hurry.</span>
        </p>
      </Reveal>

      <Reveal stagger className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-3xl bg-line md:mt-20 md:grid-cols-4">
        {STATS.map((stat) => (
          <RevealItem key={stat.label} className="bg-paper px-6 py-8">
            <p className="text-display-md font-semibold">{stat.value}</p>
            <p className="mt-2 text-[14px] text-slate">{stat.label}</p>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
