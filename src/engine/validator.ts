/**
 * Validation engine for checking user solutions
 *
 * This module provides utilities for validating user code submissions
 * and converting execution results into progress metrics.
 */

import type { Level, ExecutionResult, ValidationResult } from "./types";

/**
 * Default validation result when execution fails
 */
const FAILED_VALIDATION: ValidationResult = {
  progress: 0,
  complete: false,
  message: "Code execution failed. Check for errors.",
};

/**
 * Validates a user's code submission against a level's requirements.
 *
 * @param level - The current level definition
 * @param userCode - The raw code written by the user
 * @param executionResult - The result of executing the user's code
 *
 * @returns ValidationResult with progress metrics
 */
export async function validateLevel(
  level: Level,
  userCode: string,
  executionResult: ExecutionResult,
): Promise<ValidationResult> {
  // If execution failed, return failure result with error message
  if (!executionResult.success) {
    return {
      ...FAILED_VALIDATION,
      message: executionResult.error?.message ?? "Unknown error occurred",
    };
  }

  try {
    // Call the level's custom validation function
    const result = await level.validate(userCode, executionResult);
    return result;
  } catch (error) {
    // Handle validation function errors gracefully
    console.error("Validation error:", error);
    return {
      ...FAILED_VALIDATION,
      message:
        "Validation error: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}

/**
 * Creates a validation result helper for level authors
 * @deprecated Use direct object creation instead
 */
export function createValidationResult(
  progress: number,
  total: number,
  message?: string,
): ValidationResult {
  return {
    progress,
    complete: progress >= total,
    message,
  };
}
