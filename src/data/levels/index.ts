/**
 * Level Registry
 *
 * Central registry for all game levels.
 * To add a new level:
 * 1. Create a new level file (e.g., level-02.ts)
 * 2. Import it here
 * 3. Add it to the levels array
 */

import type { Level } from "../../engine/types";
import { level01 } from "./level-01";
import { level02 } from "./level-02";
import { level03 } from "./level-03";

/**
 * All available levels in order
 */
export const levels: Level[] = [
  level01,
  level02,
  level03,
  // Add new levels here:
  // ...
];

/**
 * Get a level by its ID
 */
export function getLevelById(id: number): Level | undefined {
  return levels.find((level) => level.id === id);
}

/**
 * Get the next level after the given level ID
 */
export function getNextLevel(currentId: number): Level | undefined {
  const currentIndex = levels.findIndex((level) => level.id === currentId);
  if (currentIndex === -1 || currentIndex >= levels.length - 1) {
    return undefined;
  }
  return levels[currentIndex + 1];
}

/**
 * Get the first level
 */
export function getFirstLevel(): Level | undefined {
  return levels[0];
}

/**
 * Get total number of levels
 */
export function getTotalLevels(): number {
  return levels.length;
}

/**
 * Check if a level is the last one
 */
export function isLastLevel(levelId: number): boolean {
  const lastLevel = levels[levels.length - 1];
  return lastLevel?.id === levelId;
}
