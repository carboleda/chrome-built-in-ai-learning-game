/**
 * Level 2: The Cold Start - Checking Availability
 *
 * Teaches the importance of checking API availability before
 * creating the LanguageDetector instance.
 */

import type {
  Level,
  ExecutionResult,
  ValidationResult,
} from "../../engine/types";

const instructions = `
### Checking the Acorn Reserves

Scribe is ready to work, but sometimes the "Forest Brain" needs to download new data before it can detect languages. If you try to use the detector before it's ready, Scribe will get a headache!

### Challenge Instructions

Before creating the detector, you must check the **availability**.

1. Call \`LanguageDetector.availability()\`.
2. Await the result of the availability function.
3. Only if it returns \`'available'\`, create the detector.

> **Note:** Always check availability before creating AI instances to ensure a smooth user experience!

### Expected Output

If the API is available, the \`detector\` variable should be a valid LanguageDetector instance that you can use to detect languages.
`;

const starterCode = `// Check if Scribe is ready to think!
const availability = await LanguageDetector.______________;
let detector;

if (availability === 'available') {
  // Create the detector here
  detector = await __________________________;
}
`;

/**
 * Validation function for Level 2
 * Checks that user properly checks availability before creating detector
 */
async function validate(
  userCode: string,
  executionResult: ExecutionResult,
): Promise<ValidationResult> {
  let progress = 0;
  const total = 2;
  const messages: string[] = [];

  const { capturedInstances } = executionResult;
  const detector = capturedInstances.detector;

  // Step 1: Check if they called availability and check for 'available'
  if (
    userCode.includes("LanguageDetector.availability()") &&
    (userCode.includes("=== 'available'") ||
      userCode.includes('=== "available"') ||
      userCode.includes("== 'available'") ||
      userCode.includes('== "available"'))
  ) {
    progress++;
    messages.push("✓ Availability check implemented correctly");
  } else {
    messages.push(
      "○ Check availability with LanguageDetector.availability() and compare to 'available'",
    );
  }

  // Step 2: Check if the detector was successfully instantiated inside the conditional
  if (
    detector &&
    typeof (detector as { detect?: unknown }).detect === "function"
  ) {
    progress++;
    messages.push(
      "✓ Detector created successfully inside the availability check",
    );
  } else {
    messages.push(
      "○ Create the detector using LanguageDetector.create() when available",
    );
  }

  return {
    progress,
    total,
    complete: progress === total,
    message: messages.join("\n"),
  };
}

export const level01: Level = {
  id: 1,
  title: "The Cold Start",
  api: "LanguageDetector",
  instructions,
  starterCode,
  context: {},
  captureVariables: ["detector", "availability"],
  validate,
};
