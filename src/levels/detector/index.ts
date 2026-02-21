import type { Level } from "../../engine/types";

/**
 * Lazy-load detector levels using dynamic imports
 * Each level is loaded only when needed, enabling better code-splitting
 */
let cachedLevels: Level[] | null = null;

export async function loadDetectorLevels(): Promise<Level[]> {
  if (cachedLevels) return cachedLevels;

  const [{ default: level01 }, { default: level02 }, { default: level03 }] =
    await Promise.all([
      import("./level-01"),
      import("./level-02"),
      import("./level-03"),
    ]);

  cachedLevels = [level01, level02, level03];
  return cachedLevels;
}

/**
 * Synchronous getter - loads from cache if available, otherwise empty
 * Used internally only
 */
export function getDetectorLevelsSync(): Level[] {
  return cachedLevels || [];
}
