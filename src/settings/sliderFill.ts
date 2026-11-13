import type { CSSProperties } from "react";

/** Drives the filled part of an iOS-style range track via the --fill CSS variable. */
export function sliderFill(value: number, min: number, max: number): CSSProperties {
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
  return { "--fill": `${Math.min(100, Math.max(0, pct))}%` } as CSSProperties;
}
