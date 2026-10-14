import { Counter } from "@/components/motion/Counter";
import { FadeUp } from "@/components/motion/FadeUp";
import { ScrubWords } from "@/components/motion/ScrubWords";

const STATS = [
  { value: 24, suffix: "", label: "Destinations we know by heart" },
  { value: 8, suffix: "", label: "Signature journeys" },
  { value: 4551, suffix: " m", label: "Highest pass we cross" },
  { value: 1200, suffix: "+", label: "Travellers so far" },
];

export function Manifesto() {
  return (
    <section className="container-x py-section">
      <p className="eyebrow mb-10 flex items-center gap-3 text-slate">
        <span>01</span>
        <span className="h-px w-10 bg-ink/30" />
        <span>Who we are</span>
      </p>
      <ScrubWords className="max-w-[22ch] font-display text-display-lg md:max-w-[26ch]">
        We are a small team from Dehradun who believe the Himalaya should be travelled slowly — on
        foot where possible, with locals always, and never in a hurry to get to the photo.
      </ScrubWords>

      <FadeUp stagger className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-32 md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="border-t border-line pt-5">
            <Counter value={stat.value} suffix={stat.suffix} className="font-display text-display-md tabular-nums" />
            <p className="mt-3 max-w-[16ch] text-sm text-slate">{stat.label}</p>
          </div>
        ))}
      </FadeUp>
    </section>
  );
}
