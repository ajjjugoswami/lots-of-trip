export const CUBIC = {
  outExpo: [0.22, 1, 0.36, 1],
  inOutQuart: [0.65, 0, 0.35, 1],
} as const;

export const REVEAL = {
  distance: 24,
  duration: 0.8,
  stagger: 0.08,
} as const;

export const IMAGE_REVEAL = {
  duration: 1.2,
  inset: "inset(7% 7% 7% 7% round 0.75rem)",
  open: "inset(0% 0% 0% 0% round 0.75rem)",
  scale: 1.1,
} as const;
