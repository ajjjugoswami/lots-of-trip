"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import { CUBIC } from "@/lib/motion/tokens";
import { padIndex } from "@/lib/utils/format";
import type { Testimonial } from "@/types/site";

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const current = items[index];

  const go = (step: number) => {
    setDirection(step);
    setIndex((value) => (value + step + items.length) % items.length);
  };

  return (
    <section className="bg-pine py-section text-snow">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="eyebrow flex items-center gap-3 text-snow/60">
            <span>08</span>
            <span className="h-px w-10 bg-snow/40" />
            <span>Field notes</span>
          </p>
          <p className="mt-6 max-w-[20ch] text-snow/70">
            In the words of people who travelled with us.
          </p>
        </div>

        <div className="md:col-span-9">
          <div className="relative min-h-[20rem] md:min-h-[24rem]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.6, ease: CUBIC.outExpo }}
              >
                <blockquote className="font-display text-lead text-balance md:text-display-md">
                  “{current.quote}”
                </blockquote>
                <figcaption className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-base">{current.name}</span>
                  <span className="eyebrow text-snow/60">
                    {current.city} · {current.trip}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-line-light pt-6">
            <span className="eyebrow tabular-nums text-snow/60">
              {padIndex(index)} / {padIndex(items.length - 1)}
            </span>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="grid size-12 place-items-center rounded-full border border-line-light transition-colors hover:bg-snow hover:text-ink"
              >
                <ArrowLeftIcon className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="grid size-12 place-items-center rounded-full border border-line-light transition-colors hover:bg-snow hover:text-ink"
              >
                <ArrowRightIcon className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
