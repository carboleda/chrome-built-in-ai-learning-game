/**
 * Level 10: Decoding the Upgrade Manual - Bonus Gate Level
 *
 * This is a bonus level that serves as a gate to unlock additional modules.
 * It requires players to enable specific Chrome flags for the next set of APIs.
 */

import type {
  Level,
  ExecutionResult,
  ValidationResult,
} from "../../engine/types";

const instructions = `
### 🔧 Decoding the Upgrade Manual: System Upgrade Required

Babel's circuits are humming, and the Cloud Terminal is ready for a major upgrade. The next modules [**Writer**](https://developer.chrome.com/docs/ai/writer-api#add_support_to_localhost), [**Rewriter**](https://developer.chrome.com/docs/ai/rewriter-api), [**Proofreader**](https://developer.chrome.com/docs/ai/proofreader-api) and [**Prompt**](https://developer.chrome.com/docs/ai/prompt-api#use_on_localhost) are locked behind hardware toggles in your host system.

To proceed, you must manually enable the following **Chrome flags** on your machine, then **restart your browser**.

Once restarted, return to this game and complete this level. Babel will verify the upgrades are running! 🚀

---

### Step-by-Step Guide

Open these URLs in a new Chrome tab:

#### 1. Enable the Base Model (Required for all experimental APIs)
> **Flag:** \`chrome://flags/#optimization-guide-on-device-model\`
>
> **Action:** Find the flag and set it to **Enabled** (or **Enabled BypassPrefFetch**)

#### 2. Enable the Writer API
> **Flag:** \`chrome://flags/#writer-api-for-gemini-nano\`
>
> **Action:** Set this flag to **Enabled**

#### 2. Enable the Rewriter API
> **Flag:** \`chrome://flags/#rewriter-api-for-gemini-nano\`
>
> **Action:** Set this flag to **Enabled**

#### 3. Enable the Prompt API
> **Flag:** \`chrome://flags/#prompt-api-for-gemini-nano-multimodal-input\`
>
> **Action:** Set this flag to **Enabled**

#### 4. Enable the Proofreader API
> **Flag:** \`chrome://flags/#proofreader-api-for-gemini-nano\`
>
> **Action:** Set this flag to **Enabled**
`;

const starterCode = `// No code to write for this level!
// This is a system configuration verification level.
// After enabling the Chrome flags above and restarting your browser,
// Babel will automatically check if the APIs are available.
`;

const totalSteps = 5;

/**
 * Validation function for Level 10
 * Checks if the required Chrome APIs are available after flags are enabled
 */
async function validate(
  _userCode: string,
  _executionResult: ExecutionResult,
): Promise<ValidationResult> {
  let progress = 0;
  const messages: string[] = [];

  // Check for each required API using the 'in' operator
  const writerInSelf = "Writer" in self;
  const rewriterInSelf = "Rewriter" in self;
  const proofreaderInSelf = "Proofreader" in self;
  const languageModelAvailable = "LanguageModel" in self;

  // Step 1: Check Writer API
  if (writerInSelf) {
    progress++;
    messages.push("✓ Writer API is available");
  } else {
    messages.push("○ Writer API not detected.");
  }

  // Step 2: Check Rewriter API
  if (rewriterInSelf) {
    progress++;
    messages.push("✓ Rewriter API is available");
  } else {
    messages.push("○ Rewriter API not detected.");
  }

  // Step 3: Check Proofreader API
  if (proofreaderInSelf) {
    progress++;
    messages.push("✓ Proofreader API is available");
  } else {
    messages.push("○ Proofreader API not detected.");
  }

  // Step 4: Check Prompt API (Language Model)
  if (languageModelAvailable) {
    progress++;
    messages.push("✓ Prompt API (Language Model) is available");
  } else {
    messages.push("○ Prompt API not detected.");
  }

  // Step 5: Check Gemini Nano base model
  // Verify the base model is available and ready
  if (writerInSelf && rewriterInSelf && proofreaderInSelf) {
    progress++;
    messages.push("✓ Gemini Nano model is ready");
  } else {
    messages.push(
      "○ Make sure the Optimization Guide flag is enabled and browser is restarted",
    );
  }

  const complete = progress === totalSteps;

  if (complete) {
    messages.push(
      "\n🎉 All APIs unlocked! The next modules are now available.",
    );
  } else {
    messages.push(
      "\n💡 Hint: Did you restart your browser after enabling the flags?",
    );
  }

  return {
    progress,
    complete,
    message: messages.join("\n"),
  };
}

const level: Level = {
  id: 10,
  title: "Decoding the Upgrade Manual",
  api: "Summarizer",
  totalSteps,
  instructions,
  starterCode,
  context: {},
  captureVariables: [],
  validate,
};

export default level;
