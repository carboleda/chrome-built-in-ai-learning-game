/**
 * Level 6: Streaming Translation - Real-Time Signal Processing
 *
 * Introduces streaming translation for long-text scenarios where translation
 * results arrive in chunks, enabling real-time processing instead of waiting
 * for the complete translation.
 */

import type {
  Level,
  ExecutionResult,
  ValidationResult,
} from "../../engine/types";

const instructions = `
### Streaming the Massive Log Archive

A massive encrypted system log just arrived at Babel's Cloud Terminal - it's too large to translate all at once! The central hub needs the information in **real-time chunks** rather than waiting for the entire log to be processed.

Your task is to use Babel's **Streaming Bridge** - a special mode of the Translator that processes long text in **chunks**, delivering results as they're ready instead of waiting for everything to complete.

### Challenge Instructions

Use the streaming translation feature to process the long text in real-time chunks:

1. **Activate the Streaming Bridge:** Create a Translator instance using \`Translator.create()\` with the target language (Spanish).
2. **Initialize the Stream:** Call the \`translateStreaming()\` method with the long text.
3. **Process the Chunks:** Use a \`for await\` loop to iterate through each chunk of the translated stream, logging or processing each piece as it arrives.

### Expected Output

Your code should output each translated chunk as it streams in, allowing Babel to process massive texts in real-time without waiting for the entire translation to complete!

\`\`\`javascript
const stream = translator.translateStreaming(longText);
for await (const chunk of stream) {
  console.log(chunk);
}
\`\`\`
`;

const starterCode = `// Massive system log from the Archive
const longText = \`The network infrastructure reports indicate nominal system status across all geographic regions. North American data centers show 99.97% uptime over the previous 24-hour monitoring period, with zero critical incidents recorded. European hub connectivity metrics demonstrate stable performance with average latency of 12 milliseconds. Asian-Pacific zone resilience systems activated 3 predictive failovers, successfully preventing potential service disruptions. All backup power systems tested successfully. Cooling systems operating within optimal parameters. Database replication lag measured at 0.3 seconds across all regions. Security scanning detected and quarantined 47 anomalous connection attempts. System maintenance windows completed ahead of schedule.\`;

// 1. Activate the Streaming Bridge with language settings
const translator = await Translator._________________;

// 2. Initialize the translation stream
const stream = translator._________________;

// 3. Process each chunk as it arrives
________________________
`;

const totalSteps = 4;

/**
 * Validation function for Level 6
 * Checks that user properly uses streaming translation API
 */
async function validate(
  userCode: string,
  executionResult: ExecutionResult,
): Promise<ValidationResult> {
  let progress = 0;
  const messages: string[] = [];

  const { capturedInstances } = executionResult;
  const translator = capturedInstances.translator;

  // Step 1: Check if they called Translator.create() with language options
  if (
    userCode.includes("Translator.create") &&
    userCode.includes("targetLanguage")
  ) {
    progress++;
    messages.push("✓ Streaming Bridge activated with language settings");
  } else {
    messages.push(
      "○ Use Translator.create({ targetLanguage: 'es' }) to initialize the translator",
    );
  }

  // Step 2: Check if the translator instance was successfully created
  if (
    translator &&
    typeof (translator as { translateStreaming?: unknown })
      .translateStreaming === "function"
  ) {
    progress++;
    messages.push("✓ Translator instance ready for streaming");
  } else {
    messages.push(
      "○ The translator variable should have a translateStreaming method",
    );
  }

  // Step 3: Check if translateStreaming was called in the code
  if (userCode.includes("translateStreaming")) {
    progress++;
    messages.push("✓ Streaming translation initiated");
  } else {
    messages.push(
      "○ Call translator.translateStreaming(longText) to start the stream",
    );
  }

  // Step 4: Check if for await loop is present to consume the stream
  if (
    userCode.includes("for await") &&
    (userCode.includes("of stream") ||
      (userCode.includes("of") && userCode.includes("stream")))
  ) {
    progress++;
    messages.push("✓ Stream chunks processing with for await loop!");
  } else {
    messages.push(
      "○ Use a for await loop to consume stream chunks: for await (const chunk of stream)",
    );
  }

  return {
    progress,
    complete: progress === totalSteps,
    message: messages.join("\n"),
  };
}

const level: Level = {
  id: 6,
  title: "Streaming Translation",
  api: "Translator",
  totalSteps,
  instructions,
  starterCode,
  context: {
    // Long text is in the starter code for user to translate
  },
  captureVariables: ["translator", "stream"],
  validate,
};

export default level;
