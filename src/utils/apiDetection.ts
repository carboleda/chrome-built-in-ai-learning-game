/**
 * Chrome AI API Detection Utilities
 *
 * Helpers for detecting availability of Chrome's Built-In AI APIs.
 */

import type { AIApiType } from "../engine/types";

/**
 * Map of API names to their window property paths
 */
const API_PATHS: Record<AIApiType, string[]> = {
  LanguageDetector: ["LanguageDetector", "ai.languageDetector"],
  Translator: ["Translator", "ai.translator"],
  Summarizer: ["Summarizer", "ai.summarizer"],
  Proofreader: ["Proofreader", "ai.proofreader"],
  Writer: ["Writer", "ai.writer"],
  Rewriter: ["Rewriter", "ai.rewriter"],
  LanguageModel: ["LanguageModel", "ai.assistant"],
};

/**
 * Safely access a nested property on window
 */
function getNestedProperty(path: string): unknown {
  const parts = path.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = window;

  for (const part of parts) {
    if (current === undefined || current === null) {
      return undefined;
    }
    current = current[part];
  }

  return current;
}

/**
 * Check if a specific Chrome AI API is available
 */
export function isApiAvailable(api: AIApiType): boolean {
  const paths = API_PATHS[api];

  for (const path of paths) {
    const value = getNestedProperty(path);
    if (value !== undefined && value !== null) {
      return true;
    }
  }

  return false;
}

/**
 * Check if any Chrome AI API is available
 */
export function isAnyApiAvailable(): boolean {
  // Check for the ai namespace
  if (typeof (window as { ai?: unknown }).ai !== "undefined") {
    return true;
  }

  // Check for individual APIs
  const apis: AIApiType[] = [
    "LanguageDetector",
    "Translator",
    "Summarizer",
    "Writer",
    "Rewriter",
  ];

  return apis.some(isApiAvailable);
}

/**
 * Get a list of all available APIs
 */
export function getAvailableApis(): AIApiType[] {
  const apis: AIApiType[] = [
    "LanguageDetector",
    "Translator",
    "Summarizer",
    "Proofreader",
    "Writer",
    "Rewriter",
    "LanguageModel",
  ];

  return apis.filter(isApiAvailable);
}
