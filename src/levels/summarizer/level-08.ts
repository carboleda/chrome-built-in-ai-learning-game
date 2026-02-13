/**
 * Level 8: The Executive Summary - Summarizer API with TL;DR Format
 *
 * The human admins need a quick briefing on a complex
 * technical documentation packet. Babel must transform it into a TL;DR.
 */

import type {
  Level,
  ExecutionResult,
  ValidationResult,
} from "../../engine/types";

const instructions = `
### The Executive Summary

A lengthy technical documentation packet has arrived at the Cloud Terminal. The system admins are busy, and they need a **TL;DR** (Too Long; Didn't Read) summary—a quick overview of the key points, perfect for a busy reader.

### Challenge Instructions

Use the \`Summarizer\` API with TL;DR format to:

1. **Activate the Compactor:** Use \`Summarizer.create({ ... })\` to initialize it with the appropriate type.
2. **Add Context (Optional):** Provide optional context about the intended audience.
3. **Process the Documentation:** Call \`summarize()\` on the \`technicalDocs\` to create the TL;DR.
4. **Capture the Summary:** Store the resulting TL;DR in a variable.

### Expected Output

A concise TL;DR summary (1-3 sentences) highlighting the most important points:

\`\`\`markdown
"The system requires a minimum of 16 GB RAM and supports horizontal scaling.
Security is managed through OAuth2, and backups run every 6 hours on
automated schedules."
\`\`\`
`;

const starterCode = `// Long technical documentation packet
const technicalDocs = \`
## System Architecture Overview

The cloud infrastructure is built on a microservices architecture with 12 independent services distributed across 3 geographic regions. Each service has its own database to ensure resilience and independent scaling. The system is designed to handle up to 100,000 concurrent users with automatic failover mechanisms.

### Hardware Requirements

**Minimum Requirements:**
- RAM: 16 GB per node (32 GB recommended for production)
- CPU: 4 cores minimum (8 cores recommended)
- Storage: 500 GB SSD per service instance
- Network: 1 Gbps minimum connection speed

**Recommended Setup:**
- RAM: 32-64 GB per node
- CPU: 8+ cores with hyperthreading
- Storage: 2 TB NVMe for optimal performance
- Network: 10 Gbps for inter-cluster communication

### Security Protocols

All communication between services uses OAuth2 with JWT tokens. User authentication is handled by a centralized identity service with 2FA support. Data at rest is encrypted with AES-256, and data in transit uses TLS 1.3. Regular security audits are conducted quarterly.

### Backup and Recovery

Automated backups run every 6 hours to geographically distributed locations. Recovery Time Objective (RTO) is 15 minutes and Recovery Point Objective (RPO) is 6 hours. All backups are tested monthly for integrity and recoverability. The disaster recovery plan is reviewed and updated twice yearly.
\`;

// 1. Create the TL;DR summarizer
const summarizer = ______________

// 2. Generate the TL;DR summary
const summary = ______________
`;

const totalSteps = 5;

/**
 * Validation function for Level 8
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

  // Step 1: Check if they used Summarizer.create() with tldr type
  if (
    userCode.includes("Summarizer.create") &&
    (userCode.includes("type") || userCode.includes("tldr"))
  ) {
    progress++;
    messages.push("✓ TL;DR summarizer initialized");
  } else {
    messages.push("○ Use Summarizer.create({ type: 'tldr' }) to initialize");
  }

  // Step 2: Check if the summarizer instance was successfully created
  if (
    summarizer &&
    typeof (summarizer as { summarize?: unknown }).summarize === "function"
  ) {
    progress++;
    messages.push("✓ Documentation processor instance created");
  } else {
    messages.push("○ The summarizer variable should be a Summarizer instance");
  }

  // Step 3: Check if summary is a non-empty string
  if (typeof summary === "string" && summary.length > 0) {
    progress++;
    messages.push(`✓ TL;DR summary generated`);
  } else {
    messages.push(
      "○ Call summarizer.summarize(technicalDocs) to create the TL;DR",
    );
  }

  // Step 4: Check if the TL;DR has reasonable length (1-3 sentences)
  if (summary && typeof summary === "string") {
    const sentences = summary
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 0);
    if (sentences.length >= 1 && sentences.length <= 5) {
      progress++;
      messages.push(
        `✓ TL;DR length appropriate: ${sentences.length} sentences`,
      );
    } else {
      messages.push(
        `○ TL;DR should be 1-3 sentences (got ${sentences.length})`,
      );
    }
  } else {
    messages.push("○ Generate and extract the TL;DR summary");
  }

  // Step 5: Verify context parameter was optional but bonus if attempted
  if (
    userCode.includes("{ context") ||
    userCode.includes("context:") ||
    userCode.includes("context =")
  ) {
    progress++;
    messages.push("✓ Advanced: Optional context parameter handled");
  } else {
    messages.push("○ Optional: Add context parameter for better results");
  }

  return {
    progress,
    complete: progress === totalSteps,
    message: messages.join("\n"),
    expectedOutput: summary,
  };
}

const level: Level = {
  id: 8,
  title: "The Executive Summary",
  api: "Summarizer",
  totalSteps,
  instructions,
  starterCode,
  context: {},
  captureVariables: ["summarizer", "summary"],
  validate,
};

export default level;
