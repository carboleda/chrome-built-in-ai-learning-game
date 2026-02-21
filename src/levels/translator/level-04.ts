/**
 * Level 4: The European Link - Basic Translation
 *
 * Introduces the Translator API to convert text between languages.
 * Babel must translate a French server status report to English.
 */

import type {
  Level,
  ExecutionResult,
  ValidationResult,
} from "../../engine/types";

const instructions = `
### Connecting the European Node

A critical status report has arrived from a French server node, but Babel's central core only understands English. Without a translation, Babel won't know if the server is running normally or if there's a critical failure!

Your task is to activate Babel's **Universal Bridge** module (Translator) to convert the incoming **French** signal into **English** so the system can understand it.

### Challenge Instructions

Use the \`Translator\` API to translate the French status report to English:

1. **Activate the Bridge:** Use <abbr title="<b>Receives an object with sourceLanguage and targetLanguage properties</b>\n{ sourceLanguage: '...', targetLanguage: '...' }">Translator.create()</abbr> with source language **French** and target language **English** options.
2. **Process the Text:** Call the \`translate()\` method with the French data packet.
3. **Capture the Result:** Store the translated English text in a variable for Babel to process.

### Expected Output

The \`translatedText\` variable should contain the English translation of the French status report, ready for Babel's central core to process.
`;

const starterCode = `// Status report received from French server node
const dataPacket = "Statut: Le système fonctionne nominalement. Tous les nœuds sont en ligne.";

// 1. Activate the Universal Bridge module with language settings
const translator = await Translator._________________;

// 2. Translate the data packet
const translatedText = await translator._________________;
`;

const totalSteps = 3;

/**
 * Validation function for Level 4
 * Checks that user properly uses the Translator API
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

  // Step 1: Check if they called Translator.create() with language options
  if (
    userCode.includes("Translator.create") &&
    userCode.includes("sourceLanguage") &&
    userCode.includes("targetLanguage") &&
    userCode.includes("'fr'") &&
    userCode.includes("'en'") &&
    userCode.indexOf("'fr'") < userCode.indexOf("'en'")
  ) {
    progress++;
    messages.push("✓ Translator bridge activated with language settings");
  } else {
    messages.push(
      "○ Use Translator.create({ sourceLanguage: 'fr', targetLanguage: 'en' }) to activate the module",
    );
  }

  // Step 2: Check if the translator instance was successfully created
  if (
    translator &&
    typeof (translator as { translate?: unknown }).translate === "function"
  ) {
    progress++;
    messages.push("✓ Translator instance ready to process signals");
  } else {
    messages.push(
      "○ The translator variable should be a Translator instance with a translate method",
    );
  }

  // Step 3: Check if the final result is a non-empty string (the translated text)
  if (
    typeof translatedText === "string" &&
    translatedText.length > 0 &&
    translatedText !==
      "Statut: Le système fonctionne nominalement. Tous les nœuds sont en ligne."
  ) {
    progress++;
    messages.push("✓ French signal successfully translated to English!");
  } else {
    messages.push(
      "○ Call translator.translate(dataPacket) to translate the text",
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
  id: 4,
  title: "The European Link",
  api: "Translator",
  totalSteps,
  instructions,
  starterCode,
  context: {
    // French text is in the starter code
  },
  captureVariables: ["translator", "translatedText"],
  validate,
};

export default level;
