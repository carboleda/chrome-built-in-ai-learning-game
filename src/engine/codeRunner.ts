/**
 * Code execution engine for running user-submitted JavaScript
 *
 * This module provides a controlled environment to execute user code
 * that interacts with Chrome's Built-In AI APIs.
 */

import type { ExecutionResult, LevelContext } from "./types";

/** Default timeout for code execution (5 seconds) */
const EXECUTION_TIMEOUT = 10000;

/**
 * Creates a timeout promise that rejects after specified milliseconds
 */
function createTimeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Code execution timed out after ${ms}ms`));
    }, ms);
  });
}

/**
 * Builds the wrapper code that will execute the user's code
 * and capture specified variables for validation.
 *
 * @param userCode - The raw code written by the user
 * @param captureVariables - Names of variables to capture after execution
 */
function buildExecutableCode(
  userCode: string,
  captureVariables: string[],
): string {
  const captureObject = captureVariables
    .map((v) => `"${v}": typeof ${v} !== 'undefined' ? ${v} : undefined`)
    .join(",\n      ");

  return `
    return (async () => {
      ${userCode}
      
      // Capture variables for validation
      const __captured__ = {
        ${captureObject}
      };
      
      return __captured__;
    })();
  `;
}

/**
 * Executes user code in a controlled context with timeout protection.
 *
 * @param userCode - The raw JavaScript code written by the user
 * @param context - Variables to inject into the execution context
 * @param captureVariables - Names of variables to capture for validation
 * @param timeout - Maximum execution time in milliseconds
 *
 * @returns ExecutionResult containing success status, result, and captured instances
 *
 * @example
 * ```ts
 * const result = await executeUserCode(
 *   'const detector = await LanguageDetector.create();',
 *   { dataPacket: 'Bonjour!' },
 *   ['detector', 'results']
 * );
 * ```
 */
export async function executeUserCode(
  userCode: string,
  context: LevelContext,
  captureVariables: string[],
  timeout: number = EXECUTION_TIMEOUT,
): Promise<ExecutionResult> {
  try {
    // Build the executable code with variable capturing
    const executableCode = buildExecutableCode(userCode, captureVariables);

    // Get context keys and values for function parameter injection
    const contextKeys = Object.keys(context);
    const contextValues = Object.values(context);

    // Create an async function with the context variables as parameters
    // This allows user code to access context variables directly
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const AsyncFunction = Object.getPrototypeOf(
      async function () {},
    ).constructor;
    const fn = new AsyncFunction(...contextKeys, executableCode);

    // Execute with timeout protection
    const capturedInstances = (await Promise.race([
      fn(...contextValues),
      createTimeout(timeout),
    ])) as Record<string, unknown>;

    // Determine the "result" - typically the last meaningful captured value
    // For most levels, this will be the detection/translation result
    const resultKey = captureVariables[captureVariables.length - 1];
    const result = capturedInstances[resultKey];

    return {
      success: true,
      result,
      error: null,
      capturedInstances,
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      error: error instanceof Error ? error : new Error(String(error)),
      capturedInstances: {},
    };
  }
}

/**
 * Checks if a specific Chrome AI API is available in the browser
 *
 * @param api - The API name to check
 * @returns boolean indicating availability
 */
export function isApiAvailable(api: string): boolean {
  // Check various possible locations for Chrome AI APIs
  const windowAny = window as unknown as Record<string, unknown>;

  // Direct window property (e.g., window.LanguageDetector)
  if (typeof windowAny[api] !== "undefined") {
    return true;
  }

  // Under window.ai namespace (e.g., window.ai.languageDetector)
  if (windowAny.ai && typeof windowAny.ai === "object") {
    const aiNamespace = windowAny.ai as Record<string, unknown>;
    const camelCaseApi = api.charAt(0).toLowerCase() + api.slice(1);
    if (typeof aiNamespace[camelCaseApi] !== "undefined") {
      return true;
    }
  }

  return false;
}
