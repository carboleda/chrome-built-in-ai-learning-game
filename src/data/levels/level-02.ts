/**
 * Level 1: The Sorting Office - Language Detection
 *
 * Introduces the LanguageDetector API to identify the language
 * of incoming "Leaf-Mail" messages.
 */

import type {
  Level,
  ExecutionResult,
  ValidationResult,
} from "../../engine/types";

const instructions = `
## 🐿️ Level 2: The Sorting Office

### Identifying the Leaf-Mail

A mysterious gust of wind has blown letters from all over the forest into Scribe's library. Before Scribe can reply, he needs to know what language they are written in! Your first task is to initialize the **Language Detector** and identify the language of the provided text.

---

### Challenge Instructions

To help Scribe, you must use the \`LanguageDetector\` API. Follow these steps:

1. **Check Availability:** First, verify if the model is available using \`LanguageDetector.availability()\`.
2. **Create the Detector:** Use the \`LanguageDetector.create()\` method to initialize the detector.
3. **Detect the Language:** Call the \`detect()\` method on the \`leafMail\` string.

> **Note:** Since these are built-in APIs, they are asynchronous. Don't forget to use \`await\`!

---

### Expected Output

The \`results\` variable should contain an array of detected languages with confidence scores, like:
\`\`\`javascript
[{ detectedLanguage: 'fr', confidence: 0.95 }]
\`\`\`
`;

const starterCode = `// The mysterious Leaf-Mail that arrived today
const leafMail = "Bonjour Scribe! Comment vas-tu?";

// 1. Create the language detector
const detector = await LanguageDetector.create();

// 2. Detect the language of leafMail
const results = // Your code here
`;

/**
 * Validation function for Level 1
 * Checks progressive completion of the LanguageDetector challenge
 */
async function validate(
  userCode: string,
  executionResult: ExecutionResult,
): Promise<ValidationResult> {
  let progress = 0;
  const total = 3;
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
    messages.push("○ Call detector.detect(leafMail) to get the results");
  }

  return {
    progress,
    total,
    complete: progress === total,
    message: messages.join("\n"),
  };
}

export const level02: Level = {
  id: 2,
  title: "The Sorting Office",
  api: "LanguageDetector",
  instructions,
  starterCode,
  context: {
    // The leafMail is already in the starter code, but we provide it in context
    // so it's available even if the user modifies/deletes the variable
  },
  captureVariables: ["detector", "results"],
  validate,
};
