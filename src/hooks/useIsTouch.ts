"use client";

import { useMediaQuery } from "./useMediaQuery";

export const useIsTouch = () => useMediaQuery("(hover: none), (pointer: coarse)");
