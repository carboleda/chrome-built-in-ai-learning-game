/**
 * Level 7: The Log Vacuum - Summarizer API with Headline Format
 *
 * Data is piling up and the buffers are full. Babel must shrink
 * massive error logs into a single sentence headline.
 */

import type {
  Level,
  ExecutionResult,
  ValidationResult,
} from "../../engine/types";

const instructions = `
### The Log Vacuum

The Cloud Terminal's error buffer is overflowing! Babel needs to extract the **headline** from a massive server error log to alert the human admins of the critical issue in just one sentence.

### Challenge Instructions

Use the \`Summarizer\` API to:

1. **Activate the Compactor:** Use \`Summarizer.create({ ... })\` with the appropriate type initialize it.
2. **Process the Log:** Call \`summarize()\` on the \`errorLog\` to extract the main issue.
3. **Capture the Alert:** Extract the generated headline and store it in a variable.

### Expected Output

A single-sentence headline (approximately 12 words) that captures the critical error:

\`\`\`
"Database connection timeout affecting all user authentication requests."
\`\`\`
`;

const starterCode = `// Massive server error log that needs compression
const errorLog = \`
[ERROR] 2024-01-15 03:47:22.123Z MainDB-Shard-01 Connection pool exhausted
[ERROR] 2024-01-15 03:47:23.456Z Auth-Service: Failed to acquire connection
[ERROR] 2024-01-15 03:47:24.789Z User-API-V2: Database unavailable
[ERROR] 2024-01-15 03:47:25.012Z Cache-Layer: Fallback failed, no data available
[CRITICAL] 2024-01-15 03:47:26.345Z MainDB-Shard-02 Connection timeout after 30s retry
[CRITICAL] 2024-01-15 03:47:27.678Z ALL-DATABASES: Master node unresponsive
[ERROR] 2024-01-15 03:47:28.901Z Session-Manager: Authentication blocked
[PANIC] 2024-01-15 03:47:29.234Z Load-Balancer: All active db connections terminated
Stack trace: Could not establish connection pool within timeout window
Details: All database shards (01-16) reporting connection refused
Impact: 100% of users unable to authenticate, system in full outage
Recovery: Automatic failover to standby cluster initiated...
\`;

// 1. Activate the summarizer with headline type
const summarizer = ______________

// 2. Process the error log to extract the headline
const summary = ______________
`;

const totalSteps = 4;

/**
 * Validation function for Level 7
 */
async function validate(
  userCode: string,
  executionResult: ExecutionResult,
): Promise<ValidationResult> {
  let progress = 0;
  const messages: string[] = [];

  const { capturedInstances } = executionResult;
  const summarizer = capturedInstances.summarizer;
  const summary = capturedInstances.summary;

  // Step 1: Check if they used Summarizer.create()
  if (userCode.includes("Summarizer.create")) {
    progress++;
    messages.push("✓ Summarizer API activated");
  } else {
    messages.push(
      "○ Use Summarizer.create({ type: 'headline' }) to initialize",
    );
  }

  // Step 2: Check if the summarizer instance was successfully created
  if (
    summarizer &&
    typeof (summarizer as { summarize?: unknown }).summarize === "function"
  ) {
    progress++;
    messages.push("✓ Log compactor instance created");
  } else {
    messages.push("○ The summarizer variable should be a Summarizer instance");
  }

  // Step 3: Check if summary is a non-empty string
  if (typeof summary === "string" && summary.length > 0) {
    progress++;
    messages.push(`✓ Headline extracted: "${summary.substring(0, 60)}..."`);
  } else {
    messages.push(
      "○ Call summarizer.summarize(errorLog) to extract the headline",
    );
  }

  // Step 4: Check if the result looks like a headline (reasonable length)
  if (summary && typeof summary === "string") {
    const wordCount = summary.trim().split(/\s+/).length;
    if (wordCount >= 8 && wordCount <= 25) {
      progress++;
      messages.push(
        `✓ Headline length appropriate: ${wordCount} words (target: ~12)`,
      );
    } else {
      messages.push(
        `○ Headline should be concise (currently ${wordCount} words, target ~12)`,
      );
    }
  } else {
    messages.push("○ Extract the headline result to verify");
  }

  return {
    progress,
    complete: progress === totalSteps,
    message: messages.join("\n"),
  };
}

const level: Level = {
  id: 7,
  title: "The Log Vacuum",
  api: "Summarizer",
  totalSteps,
  instructions,
  starterCode,
  context: {},
  captureVariables: ["summarizer", "summary"],
  validate,
};

export default level;
