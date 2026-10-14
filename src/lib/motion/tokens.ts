export const EASE = {
  outExpo: "expo.out",
  inOutQuart: "power4.inOut",
  outQuart: "power4.out",
} as const;

export const CUBIC = {
  outExpo: [0.22, 1, 0.36, 1],
  inOutQuart: [0.65, 0, 0.35, 1],
} as const;

export const DURATION = {
  micro: 0.2,
  ui: 0.45,
  reveal: 1.1,
  hero: 1.6,
} as const;

export const STAGGER = {
  lines: 0.09,
  words: 0.03,
  cards: 0.08,
} as const;

export const PRELOADER_DONE_EVENT = "lot:preloader-done";
