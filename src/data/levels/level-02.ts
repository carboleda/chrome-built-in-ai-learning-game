/**
 * Level 2: First Contact - Language Detection
 *
 * Introduces the LanguageDetector API to identify the language
 * of incoming data packets in the Cloud Terminal.
 */

import type {
  Level,
  ExecutionResult,
  ValidationResult,
} from "../../engine/types";

const instructions = `
### Identifying the Signal Source

A stray data packet has arrived at Babel's Cloud Terminal from an unknown origin. Before Babel can route it to the correct destination node, he needs to identify what language it's encoded in! Your task is to initialize the **Sensor Array** and identify the language of the incoming signal.

### Challenge Instructions

To help Babel analyze the data packet, you must use the \`LanguageDetector\` API. Follow these steps:

1. **Check Availability:** First, verify if the module is available using \`LanguageDetector.availability()\`.
2. **Activate the Sensor:** Use the \`LanguageDetector.create()\` method to initialize the detector.
3. **Analyze the Signal:** Call the \`detect()\` method on the \`dataPacket\` string. Don't forget to \`await\` for the result!

### Expected Output

The \`results\` variable should contain an array of detected languages with confidence scores, like:
\`\`\`javascript
[{ detectedLanguage: 'fr', confidence: 0.95 }]
\`\`\`
`;

const starterCode = `// Incoming data packet from unknown origin
const dataPacket = "Bonjour Terminal! Statut du syst\u00e8me?";

// 1. Activate the language detector
const detector = await LanguageDetector.create();

// 2. Analyze the language of the data packet
const results = // Your code here
`;
const totalSteps = 3;

/**
 * Validation function for Level 1
 * Checks progressive completion of the LanguageDetector challenge
 */
async function validate(
  userCode: string,
  executionResult: ExecutionResult,
): Promise<ValidationResult> {
  let progress = 0;
  const messages: string[] = [];

  const { capturedInstances } = executionResult;
  const detector = capturedInstances.detector;
  const results = capturedInstances.results;

  // Step 1: Check if they checked for availability or created the detector
  if (
    userCode.includes("LanguageDetector.availability") ||
    userCode.includes("LanguageDetector.create")
  ) {
    progress++;
    messages.push("✓ LanguageDetector API usage detected");
  } else {
    messages.push("○ Use LanguageDetector.create() to create a detector");
  }

  // Step 2: Check if the detector instance was successfully created
  if (
    detector &&
    typeof (detector as { detect?: unknown }).detect === "function"
  ) {
    progress++;
    messages.push("✓ Detector instance created successfully");
  } else {
    messages.push(
      "○ The detector variable should be a LanguageDetector instance",
    );
  }

  // Step 3: Check if the final result is an array with language detection objects
  if (
    Array.isArray(results) &&
    results.length > 0 &&
    typeof results[0] === "object" &&
    results[0] !== null &&
    "detectedLanguage" in results[0]
  ) {
    progress++;
    messages.push("✓ Language detected successfully!");
  } else {
    messages.push("○ Call detector.detect(dataPacket) to get the results");
  }

  return {
    progress,
    complete: progress === totalSteps,
    message: messages.join("\n"),
  };
}

export const level02: Level = {
  id: 2,
  title: "First Contact",
  api: "LanguageDetector",
  totalSteps,
  instructions,
  starterCode,
  context: {
    // The dataPacket is already in the starter code, but we provide it in context
    // so it's available even if the user modifies/deletes the variable
  },
  captureVariables: ["detector", "results"],
  validate,
};
