"use client";

import { usePreloaderDone } from "@/hooks/usePreloaderDone";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function useMotionReady() {
  const ready = usePreloaderDone();
  const reduced = useReducedMotion();
  return { ready, reduced, dependencies: [ready, reduced] };
}
