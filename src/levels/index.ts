/**
 * Level Registry
 *
 * Central registry for all game levels with dynamic importing for code-splitting.
 * Levels are loaded lazily on-demand and cached for subsequent accesses.
 *
 * To add a new level:
 * 1. Create a new level file (e.g., level-02.ts)
 * 2. Add it to the appropriate category index (detector, translator, or summarizer)
 * 3. Update the load functions below if creating a new category
 */

import type { Level } from "../engine/types";
import { loadDetectorLevels, getDetectorLevelsSync } from "./detector";
import { loadTranslatorLevels, getTranslatorLevelsSync } from "./translator";
import { loadSummarizerLevels, getSummarizerLevelsSync } from "./summarizer";

// Cache for all loaded levels
let cachedAllLevels: Level[] | null = null;
let levelsLoadingPromise: Promise<Level[]> | null = null;

/**
 * Asynchronously load all levels (called once on app initialization)
 * Subsequent calls use the cached result
 */
export async function loadAllLevels(): Promise<Level[]> {
  // Return cached result if available
  if (cachedAllLevels) {
    return cachedAllLevels;
  }

  // Return existing promise if loading is already in progress
  if (levelsLoadingPromise) {
    return levelsLoadingPromise;
  }

  // Start loading all level categories in parallel
  levelsLoadingPromise = (async () => {
    const [detector, translator, summarizer] = await Promise.all([
      loadDetectorLevels(),
      loadTranslatorLevels(),
      loadSummarizerLevels(),
    ]);

    cachedAllLevels = [...detector, ...translator, ...summarizer];
    return cachedAllLevels;
  })();

  return levelsLoadingPromise;
}

/**
 * Get the cached levels array (synchronous)
 * Use only after loadAllLevels() has been called
 * This is a getter that returns the actual array reference
 */
function getLevelsSync(): Level[] {
  if (cachedAllLevels) {
    return cachedAllLevels;
  }
  // Fallback for sync access before async loading completes
  // Attempts to use cached levels from individual categories
  return [
    ...getDetectorLevelsSync(),
    ...getTranslatorLevelsSync(),
    ...getSummarizerLevelsSync(),
  ];
}

/**
 * Proxy-based levels export that maintains backward compatibility
 * Dynamically retrieves levels from cache when accessed
 */
export const levels: Level[] = new Proxy([] as Level[], {
  get(_, prop: string | symbol) {
    const actualLevels = getLevelsSync();

    // Handle array methods by binding them to actual levels
    if (
      typeof prop === "string" &&
      typeof (actualLevels as any)[prop] === "function"
    ) {
      return ((actualLevels as any)[prop] as any).bind(actualLevels);
    }

    // Handle standard property access
    return Reflect.get(actualLevels, prop);
  },
});

/**
 * Get a level by its ID
 */
export function getLevelById(id: number): Level | undefined {
  return getLevelsSync().find((level) => level.id === id);
}

/**
 * Get the next level after the given level ID
 */
export function getNextLevel(currentId: number): Level | undefined {
  const allLevels = getLevelsSync();
  const currentIndex = allLevels.findIndex((level) => level.id === currentId);
  if (currentIndex === -1 || currentIndex >= allLevels.length - 1) {
    return undefined;
  }
  return allLevels[currentIndex + 1];
}

/**
 * Get the first level
 */
export function getFirstLevel(): Level | undefined {
  return getLevelsSync()[0];
}

/**
 * Get total number of levels
 */
export function getTotalLevels(): number {
  return getLevelsSync().length;
}

/**
 * Check if a level is the last one
 */
export function isLastLevel(levelId: number): boolean {
  const allLevels = getLevelsSync();
  const lastLevel = allLevels[allLevels.length - 1];
  return lastLevel?.id === levelId;
}
