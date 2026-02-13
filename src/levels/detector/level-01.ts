/**
 * Level 1: System Boot - Checking Availability
 *
 * Teaches the importance of checking API availability before
 * activating Babel's Sensor Array module.
 */

import type {
  Level,
  ExecutionResult,
  ValidationResult,
} from "../../engine/types";

const instructions = `
### Initializing the Sensor Array

Babel is ready to analyze data packets, but first we need to verify that the **Sensor Array** module is loaded and ready. If you try to activate the detector before the system is ready, Babel will experience a critical error!

### Challenge Instructions

Before creating the detector, you must check the **availability** of the system module.

1. Call \`LanguageDetector.availability()\`.
2. Await the result of the availability check.
3. Only if it returns \`'available'\`, activate the detector module.

> **Note:** Always check availability before creating AI instances to ensure a smooth user experience!

### Expected Output

If the Sensor Array is available, the \`detector\` variable should be a valid LanguageDetector instance that Babel can use to analyze incoming signals.
`;

const starterCode = `// Check if Babel's Sensor Array is ready!
const availability = await LanguageDetector.______________;
let detector;

if (availability === 'available') {
  // Activate the Sensor Array module
  detector = await __________________________;
}
`;
const totalSteps = 2;

/**
 * Validation function for Level 1
 * Checks that user properly checks availability before creating detector
 */
async function validate(
  userCode: string,
  executionResult: ExecutionResult,
): Promise<ValidationResult> {
  let progress = 0;
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
    complete: progress === totalSteps,
    message: messages.join("\n"),
    expectedOutput: detector,
  };
}

const level: Level = {
  id: 1,
  title: "System Boot",
  api: "LanguageDetector",
  totalSteps,
  instructions,
  starterCode,
  context: {},
  captureVariables: ["detector", "availability"],
  validate,
};

export default level;
