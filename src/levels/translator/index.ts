import type { Level } from "../../engine/types";

/**
 * Lazy-load translator levels using dynamic imports
 * Each level is loaded only when needed, enabling better code-splitting
 */
let cachedLevels: Level[] | null = null;

export async function loadTranslatorLevels(): Promise<Level[]> {
  if (cachedLevels) return cachedLevels;

  const [{ default: level04 }, { default: level05 }, { default: level06 }] =
    await Promise.all([
      import("./level-04"),
      import("./level-05"),
      import("./level-06"),
    ]);

  cachedLevels = [level04, level05, level06];
  return cachedLevels;
}

/**
 * Synchronous getter - loads from cache if available, otherwise empty
 * Used internally only
 */
export function getTranslatorLevelsSync(): Level[] {
  return cachedLevels || [];
}
