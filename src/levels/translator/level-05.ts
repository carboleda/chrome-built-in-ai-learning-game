/**
 * Level 5: The Asian Gateway - Cross-Region Translation
 *
 * Expands translator knowledge with a more complex language pair:
 * Japanese to Spanish, connecting distant server regions.
 */

import type {
  Level,
  ExecutionResult,
  ValidationResult,
} from "../../engine/types";

const instructions = `
### Bridging the Asian and Spanish Networks

Two critical server nodes have lost communication: a Japanese data center and a Spanish service hub. They need to exchange status information, but they speak different digital languages. Babel must activate a **cross-region bridge** using the Translator to keep both nodes synchronized!

### Challenge Instructions

Use the \`Translator\` API to bridge the communication gap by translating Japanese text to Spanish:

1. **Activate the Bridge:** Create a new Translator instance using \`Translator.create()\` and specify **Japanese** as the source language and **Spanish** as the target language.
2. **Configure the Translation Route:** Call the \`translate()\` method with the Japanese status message.
3. **Establish the Connection:** Store the Spanish translation so the Spanish hub can process the incoming signal.

### Expected Output

The \`translatedText\` variable should contain a Spanish translation of the Japanese status message, successfully connecting the two regional nodes.
`;

const starterCode = `// Status signal from Japanese data center
const dataPacket = "こんにちは、システムの状態は正常です。すべてのノードがオンラインです。";

// 1. Activate the cross-region bridge with language settings
const translator = await Translator._________________;

// 2. Translate the signal
const translatedText = await translator._________________;
`;

const totalSteps = 3;

/**
 * Validation function for Level 5
 * Checks that user properly translates between non-European languages
 */
async function validate(
  userCode: string,
  executionResult: ExecutionResult,
): Promise<ValidationResult> {
  let progress = 0;
  const messages: string[] = [];

  const { capturedInstances } = executionResult;
  const translator = capturedInstances.translator;
  const translatedText = capturedInstances.translatedText;

  // Step 1: Check if they called Translator.create()
  if (
    userCode.includes("Translator.create") &&
    userCode.includes("sourceLanguage") &&
    userCode.includes("targetLanguage") &&
    userCode.includes("'ja'") &&
    userCode.includes("'es'") &&
    userCode.indexOf("'ja'") < userCode.indexOf("'es'")
  ) {
    progress++;
    messages.push("✓ Cross-region bridge activated");
  } else {
    messages.push(
      "○ Use Translator.create({ sourceLanguage: 'ja', targetLanguage: 'es' }) to initialize the translator",
    );
  }

  // Step 2: Check if the translator instance was successfully created
  if (
    translator &&
    typeof (translator as { translate?: unknown }).translate === "function"
  ) {
    progress++;
    messages.push("✓ Translator instance ready for cross-region routing");
  } else {
    messages.push("○ The translator variable should be a Translator instance");
  }

  // Step 3: Check if the final result is a translated string
  if (
    typeof translatedText === "string" &&
    translatedText.length > 0 &&
    translatedText !==
      "こんにちは、システムの状態は正常です。すべてのノードがオンラインです。"
  ) {
    progress++;
    messages.push("✓ Japanese signal successfully translated to Spanish!");
  } else {
    messages.push(
      "○ Call translator.translate(dataPacket) to bridge the nodes",
    );
  }

  return {
    progress,
    complete: progress === totalSteps,
    message: messages.join("\n"),
    expectedOutput: translatedText,
  };
}

const level: Level = {
  id: 5,
  title: "The Asian Gateway",
  api: "Translator",
  totalSteps,
  instructions,
  starterCode,
  context: {
    // Japanese text is in the starter code
  },
  captureVariables: ["translator", "translatedText"],
  validate,
};

export default level;
