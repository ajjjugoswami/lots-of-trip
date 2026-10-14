"use client";

import { useEffect, useState } from "react";
import { PRELOADER_DONE_EVENT } from "@/lib/motion/tokens";

declare global {
  interface Window {
    __lotPreloaderDone?: boolean;
  }
}

export function usePreloaderDone() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const markDone = () => setDone(true);
    if (window.__lotPreloaderDone) {
      queueMicrotask(markDone);
      return;
    }
    window.addEventListener(PRELOADER_DONE_EVENT, markDone, { once: true });
    return () => window.removeEventListener(PRELOADER_DONE_EVENT, markDone);
  }, []);

  return done;
}
