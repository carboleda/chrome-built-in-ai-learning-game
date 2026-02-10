# Chrome Built-In AI Learning Game

I want to create a game like https://flexboxfroggy.com/ to help developers to learn about the Chrome Built-In AI APIs.

## 🛰️ Project Concept: Babel's Signal Routing

**Babel** is a small, retro-futuristic robot floating in a digital "Cloud Terminal." Every moment, massive amounts of data flow through the internet, and Babel's job is to route, translate, and condense these data packets to keep the digital world running smoothly. Babel uses the browser's built-in AI power to process signals instantly.

### The Game Loop

- **The Problem:** Corrupted data packets, routing failures, or communication protocol errors.
- **The Code:** The player writes the specific Chrome AI API syntax to solve the problem.
- **The Result:** Babel processes the signals, and the visual state of the game updates (e.g., data packets get routed correctly, compressed logs shrink, garbled signals get cleaned).

---

### 🗺️ Level Breakdown: The 7-API Journey

To keep the charm of Flexbox Froggy while covering the full suite of Chrome Built-in AI APIs, we need a mascot whose "job" naturally involves handling information.

Meet **"Babel the Signal-Bot"**. Babel is a small, retro-futuristic robot floating in a digital "Cloud Terminal" who needs to manage the massive flow of data packets streaming through the internet.

### Why Babel?

A robot routing and processing data signals is the perfect metaphor for a local AI model processing information directly in the browser. Each API represents a specialized "Module" that Babel must activate to solve different types of data challenges.

---

## 🛰️ Babel's Signal Routing: Level Breakdown

Each level requires the player to write a line of JavaScript using the `window.ai` or `window.translation` namespaces to help Babel complete a task.

| Level     | API / Module         | Babel's Mission                                                                                                             |
| --------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **1-3**   | **LanguageDetector** | **Sensor Array** - Babel needs to identify incoming data packets by language before they can be routed to the correct node. |
| **4-6**   | **Translator**       | **Universal Bridge** - Babel must translate signals between nodes that don't speak the same digital language.               |
| **7-9**   | **Summarizer**       | **Data Compaction** - The buffers are full! Babel must shrink massive server logs into digestible pings.                    |
| **10-12** | **Proofreader**      | **Protocol Refinement** - Data corruption is causing typos in system messages. Babel must clean the signal.                 |
| **13-15** | **Writer**           | **Signal Synthesis** - Babel must generate new data packets from scratch based on local prompts.                            |
| **16-18** | **Rewriter**         | **Signal Transformation** - Babel must change the "tone" of data packets without losing their meaning.                      |
| **19-24** | **Prompt API**       | **Core Intelligence** - Access Babel's Gemini Nano core to solve complex logic puzzles and prevent a total system collapse. |

---

### Functional Requirments

1. The game will have several levels define in a file, each level should include the following information:
   - Title
   - Challenge instructions
   - Function to check the solution actually work (could be using an assertion library)
2. The function that verifies the solution, should return the progress, if for example the user has to call two functions and is calling only one, the function should return { progress: 1, total: 2 }, meaning 1 of 2 steps have been completed.
3. The UI should include a code editor in the left side where the player can write the code solve each challenge
4. The UI should include a visual area in the right side, where the user can see the character and an animation or someting moving when player partially completes the challenge, it could a progress bar or something like that.

### Non Functional Requirements

1. The application should run totaly on the client side with static resources
2. I should be able to deploy it using Firebase Hosting, GitHub pages or any other service
3. The application should be developed using React.js
4. Vite should be use as framework

---

### A Quick Example Level

### 🛰️ Level 1: First Contact

### Title: Identifying the Signal Source

A stray data packet has arrived at Babel's Cloud Terminal from an unknown origin. Before Babel can route it to the correct destination, he needs to identify what language it's encoded in! Your first task is to initialize the **Language Detector** and identify the language of the incoming signal.

---

### Challenge Instructions

To help Babel, you must use the `window.LanguageDetector` API. Follow these steps:

1. **Check Availability:** First, verify if the Sensor Array module is available on the user's device using `LanguageDetector.availability()`.
2. **Create the Detector:** Use the `create()` method to initialize the sensor.
3. **Detect the Language:** Call the `detect()` method on the string `dataPacket`.

> **Note:** Since these are built-in APIs, they are asynchronous. Don't forget to use `await`!

---

### Validation Script

This function is used by the game engine to monitor your progress in real-time. It checks if you have successfully instantiated the detector and retrieved the results.

```javascript
/**
 * Validation function for Level 1
 * @param {string} userCode - The raw string of code from the editor
 * @param {any} userResult - The final variable returned by the user's code
 * @param {any} detectorInstance - The instance created by the user
 */
async function checkLevel1Progress(userCode, userResult, detectorInstance) {
  let progress = 0;
  const total = 3;

  // 1. Check if they checked for capabilities or initialized the creator
  if (
    userCode.includes("LanguageDetector.availability") ||
    userCode.includes("LanguageDetector.create")
  ) {
    progress++;
  }

  // 2. Check if the detector instance was successfully created
  if (detectorInstance && typeof detectorInstance.detect === "function") {
    progress++;
  }

  // 3. Check if the final result is an array containing the language detection objects
  // Expected result format: [{detectedLanguage: 'en', confidence: 0.9}]
  if (
    Array.isArray(userResult) &&
    userResult.length > 0 &&
    userResult[0].detectedLanguage
  ) {
    progress++;
  }

  return {
    progress: progress,
    total: total,
    complete: progress === total,
  };
}
```

---

### Starter Code

```javascript
const dataPacket = "Bonjour Terminal! Statut du système?";

// 1. Create the detector
const detector = await LanguageDetector.create();

// 2. Detect the language of dataPacket
const results = // Your code here

```

# Prompt to Cloude Opus 4.5

Help me to plan the implementation of this game. The idea is to create the core supporting 1 level and allow the addition of more levels later. The should include all the necesary core logic and it should be generic and reusable
