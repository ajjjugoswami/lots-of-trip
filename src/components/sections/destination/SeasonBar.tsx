import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils/cn";
import { MONTHS, monthShort } from "@/lib/utils/format";

export function SeasonBar({ months, name }: { months: number[]; name: string }) {
  return (
    <section className="container-x pb-section">
      <Reveal className="rounded-xl bg-paper p-7 md:p-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-saffron">When to go</p>
            <h2 className="mt-2 text-display-md">Best months for {name}</h2>
          </div>
          <p className="flex items-center gap-4 text-[13px] text-slate">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-accent" /> Ideal
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-glacier" /> Off season
            </span>
          </p>
        </div>
        <ol className="mt-8 grid grid-cols-6 gap-2 md:grid-cols-12">
          {MONTHS.map((month, index) => {
            const active = months.includes(index + 1);
            return (
              <li key={month} className="text-center">
                <span
                  aria-label={`${month}: ${active ? "ideal" : "off season"}`}
                  className={cn("block h-2 rounded-full", active ? "bg-accent" : "bg-glacier")}
                />
                <span className={cn("mt-2 block text-[12px]", active ? "font-semibold text-ink" : "text-slate")}>
                  {monthShort(index + 1)}
                </span>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </section>
  );
}
