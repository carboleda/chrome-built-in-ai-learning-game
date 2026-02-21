import type { Level } from "../../engine/types";

/**
 * Lazy-load summarizer levels using dynamic imports
 * Each level is loaded only when needed, enabling better code-splitting
 */
let cachedLevels: Level[] | null = null;

export async function loadSummarizerLevels(): Promise<Level[]> {
  if (cachedLevels) return cachedLevels;

  const [
    { default: level07 },
    { default: level08 },
    { default: level09 },
    { default: level10 },
  ] = await Promise.all([
    import("./level-07"),
    import("./level-08"),
    import("./level-09"),
    import("./level-10"),
  ]);

  cachedLevels = [level07, level08, level09, level10];
  return cachedLevels;
}

/**
 * Synchronous getter - loads from cache if available, otherwise empty
 * Used internally only
 */
export function getSummarizerLevelsSync(): Level[] {
  return cachedLevels || [];
}
