/**
 * Level 3: Multi-Channel - Language Detection with Priority
 *
 * Builds on the LanguageDetector API to identify multiple languages
 * and determine the primary language in a bilingual data packet.
 */

import type {
  Level,
  ExecutionResult,
  ValidationResult,
} from "../../engine/types";

const instructions = `
### Decoding the Multi-Channel Packet

A bilingual data packet has arrived at the Cloud Terminal! Babel needs to identify all languages present and determine which one is **primary** to route it correctly.

### Challenge Instructions

Use the \`LanguageDetector\` API to:

1. **Activate the Detector:** Use \`LanguageDetector.create()\` to initialize it.
2. **Analyze the Packet:** Call \`detect()\` on the \`multiChannelPacket\` to find all languages with confidence scores.
3. **Find the Primary Language:** Extract the language with the highest confidence score.

### Expected Output

\`\`\`javascript
[
  { detectedLanguage: 'en', confidence: 0.92 },
  { detectedLanguage: 'es', confidence: 0.65 }
]
\`\`\`

The \`primaryLanguage\` should be the language code from the entry with the highest confidence score (in this example: \`'en'\`).
`;

const starterCode = `// Multi-channel data packet with mixed languages
const multiChannelPacket = "Hello! ¿Cómo estás? System status update available at the main console.";

// 1. Activate the language detector
const detector = await LanguageDetector.create();

// 2. Analyze the packet for all languages
const results = ______________

// 3. Find the primary language (highest confidence)
const primaryLanguage = ______________
`;

const totalSteps = 4;

/**
 * Validation function for Level 3
 * Checks progressive completion of multi-language detection
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
  const primaryLanguage = capturedInstances.primaryLanguage;

  // Step 1: Check if they used LanguageDetector
  if (userCode.includes("LanguageDetector.create")) {
    progress++;
    messages.push("✓ LanguageDetector API activated");
  } else {
    messages.push("○ Use LanguageDetector.create() to initialize the detector");
  }

  // Step 2: Check if the detector instance was successfully created
  if (
    detector &&
    typeof (detector as { detect?: unknown }).detect === "function"
  ) {
    progress++;
    messages.push("✓ Multi-channel detector instance created");
  } else {
    messages.push(
      "○ The detector variable should be a LanguageDetector instance",
    );
  }

  // Step 3: Check if results is an array with multiple language detections
  if (
    Array.isArray(results) &&
    results.length >= 1 &&
    typeof results[0] === "object" &&
    results[0] !== null &&
    "detectedLanguage" in results[0] &&
    "confidence" in results[0]
  ) {
    progress++;
    messages.push(`✓ Detected ${results.length} language(s) in the packet`);
  } else {
    messages.push(
      "○ Call detector.detect(multiChannelPacket) to analyze the packet",
    );
  }

  // Step 4: Check if they extracted the primary language correctly
  if (
    primaryLanguage &&
    typeof primaryLanguage === "string" &&
    results &&
    Array.isArray(results) &&
    results.length > 0
  ) {
    // Verify it matches the highest confidence language
    const highestConfidence = results[0];
    if (
      primaryLanguage === highestConfidence.detectedLanguage ||
      primaryLanguage ===
        (highestConfidence as Record<string, unknown>).detectedLanguage
    ) {
      progress++;
      messages.push(
        `✓ Primary language identified correctly: "${primaryLanguage}"`,
      );
    } else {
      messages.push(
        "○ primaryLanguage should be the language with the highest confidence score",
      );
    }
  } else {
    messages.push(
      "○ Extract the primary language from the highest confidence result",
    );
  }

  return {
    progress,
    complete: progress === totalSteps,
    message: messages.join("\n"),
  };
}

export const level03: Level = {
  id: 3,
  title: "Multi-Channel",
  api: "LanguageDetector",
  totalSteps,
  instructions,
  starterCode,
  context: {
    // The multiChannelPacket is in the starter code
  },
  captureVariables: ["detector", "results", "primaryLanguage"],
  validate,
};
