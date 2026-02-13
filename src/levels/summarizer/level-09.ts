/**
 * Level 9: Teaser Mode - Summarizer API with Teaser Format
 *
 * A series of blog posts have arrived at the Cloud Terminal.
 * Babel must generate an engaging teaser to draw readers in.
 */

import type {
  Level,
  ExecutionResult,
  ValidationResult,
} from "../../engine/types";

const instructions = `
### Teaser Mode

A collection of blog posts has flooded into the Cloud Terminal's content buffer. To keep readers engaged, Babel needs to create a **short** captivating **teaser**, a summary that highlights the most intriguing or interesting parts and makes readers want to dive deeper.

### Challenge Instructions

Use the \`Summarizer\` API with teaser format to:

1. **Activate the Teaser Engine:** Use \`Summarizer.create({ ... })\` to initialize it with the appropriate type and length.
2. **Provide Context (Optional):** Add optional context if needed (e.g., intended audience).
3. **Generate the Teaser:** Call \`summarize()\` on the \`blogContent\` to create an engaging teaser.
4. **Capture the Teaser:** Store the result in a variable.

### Expected Output

An engaging teaser (1-2 sentences) that hooks the reader:

\`\`\`markdown
"Discover how a small startup transformed the entire data infrastructure
landscape of the cloud industry in just 18 months."
\`\`\`
`;

const starterCode = `// Blog post content that needs an engaging teaser
const blogContent = \`
Title: How We Scaled to a Billion Requests Per Day

In this post, we'll share the incredible journey of how our startup grew from
a small team of 5 engineers to a company handling over 1 billion API requests
daily. When we started, nobody believed we could compete with the established
cloud giants. But through innovation, perseverance, and some unconventional
architectural decisions, we not only survived—we thrived.

Our early days were filled with technical debt and quick fixes. We had to
choose between moving fast and keeping the code clean. We chose speed, knowing
we'd pay the price later. But "later" came sooner than we expected. By the time
we had 10 million users, our infrastructure was groaning under the strain.

The turning point came when we made the bold decision to completely rewrite our
core services from scratch. This wasn't a decision made lightly—it meant 6 months
of intensive development with zero new features shipped to customers. But the
payoff was enormous. Our latency dropped by 60%, and our infrastructure cost
decreased by 40%.

We discovered the power of breaking monoliths into microservices, implementing
intelligent caching strategies, and building our own specialized databases
optimized for our specific use cases. Each decision was made with real data and
careful measurement.

Today, we handle more traffic than entire Fortune 500 companies combined, and we
do it with a lean team. This post is a deep dive into the architectural choices
that got us here, the lessons we learned along the way, and the surprising
insights that changed how we think about infrastructure.
\`;

// 1. Initialize the teaser generator
const summarizer = ______________

// 2. Generate an engaging teaser
const teaser = ______________
`;

const totalSteps = 5;

/**
 * Validation function for Level 9
 */
async function validate(
  userCode: string,
  executionResult: ExecutionResult,
): Promise<ValidationResult> {
  let progress = 0;
  const messages: string[] = [];

  const { capturedInstances } = executionResult;
  const summarizer = capturedInstances.summarizer;
  const teaser = capturedInstances.teaser;

  // Step 1: Check if they used Summarizer.create() with teaser type
  if (
    userCode.includes("Summarizer.create") &&
    (userCode.includes("type") || userCode.includes("teaser"))
  ) {
    progress++;
    messages.push("✓ Teaser engine initialized");
  } else {
    messages.push("○ Use Summarizer.create({ type: 'teaser' }) to initialize");
  }

  // Step 2: Check if the summarizer instance was successfully created
  if (
    summarizer &&
    typeof (summarizer as { summarize?: unknown }).summarize === "function"
  ) {
    progress++;
    messages.push("✓ Teaser generator instance created");
  } else {
    messages.push("○ The summarizer variable should be a Summarizer instance");
  }

  // Step 3: Check if teaser is a non-empty string
  if (typeof teaser === "string" && teaser.length > 0) {
    progress++;
    messages.push(`✓ Engaging teaser generated`);
  } else {
    messages.push(
      "○ Call summarizer.summarize(blogContent) to create the teaser",
    );
  }

  // Step 4: Check if the teaser has a reasonable length and sounds engaging
  if (teaser && typeof teaser === "string") {
    const sentences = teaser.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    if (sentences.length >= 1 && sentences.length <= 3) {
      progress++;
      messages.push(
        `✓ Teaser length perfect: ${sentences.length} sentence${sentences.length !== 1 ? "s" : ""}`,
      );
    } else {
      messages.push(
        `○ Teaser should be 1-2 intriguing sentences (got ${sentences.length})`,
      );
    }
  } else {
    messages.push("○ Generate and extract the teaser");
  }

  // Step 5: Verify context or length parameter usage
  if (
    userCode.includes("{ context") ||
    userCode.includes("length") ||
    userCode.includes("sharedContext")
  ) {
    progress++;
    messages.push("✓ Advanced: Optional parameters configured");
  } else {
    messages.push("○ Optional: Customize with length or context parameters");
  }

  return {
    progress,
    complete: progress === totalSteps,
    message: messages.join("\n"),
    expectedOutput: teaser,
  };
}

const level: Level = {
  id: 9,
  title: "Teaser Mode",
  api: "Summarizer",
  totalSteps,
  instructions,
  starterCode,
  context: {},
  captureVariables: ["summarizer", "teaser"],
  validate,
};

export default level;
