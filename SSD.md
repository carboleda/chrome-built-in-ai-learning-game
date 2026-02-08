# Chrome Built-In AI Learning Game

I want to create a game like https://flexboxfroggy.com/ to help developers to learn about the Chrome Built-In AI APIs.

## 🐿️ Project Concept: Scribe’s AI Adventure

**Scribe** is the official librarian of the Great Oak Forest. Every day, animals from all over the world send messages via "Leaf-Mail." To keep the forest running smoothly, Scribe needs to use the browser’s built-in power to process, translate, and generate text instantly.

### The Game Loop

- **The Problem:** A messy pile of "Leaf-Mail" or a communication breakdown.
- **The Code:** The player writes the specific Chrome AI API syntax to solve the problem.
- **The Result:** Scribe processes the data, and the visual state of the game updates (e.g., letters get sorted into bins, a long scroll shrinks into a tiny note).

---

### 🗺️ Level Breakdown: The 7-API Journey

To keep the charm of Flexbox Froggy while covering the full suite of Chrome Built-in AI APIs, we need a mascot whose "job" naturally involves handling information.

Meet **"Scribe the Squirrel"**. Scribe is a forest librarian who needs to manage a massive influx of messages, books, and letters from all the animals in the woods.

### Why Scribe?

A squirrel gathering and processing "nuts" (data) is the perfect metaphor for a local AI model processing information directly in the browser.

---

## 🐿️ Scribe’s AI Adventure: Level Breakdown

Each level requires the player to write a line of JavaScript using the `window.ai` or `window.translation` namespaces to help Scribe complete a task.

| Level     | API                  | Scribe’s Goal                                                                                                                       |
| --------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **1-3**   | **LanguageDetector** | Scribe finds a pile of letters. He needs to sort them by language so he knows who to send them to.                                  |
| **4-6**   | **Translator**       | An owl from a faraway forest sent a message! Help Scribe translate it into "Squirrel-ish."                                          |
| **7-9**   | **Summarizer**       | The Bear sent a 50-page complaint about the winter. Scribe needs a "TL;DR" to save time.                                            |
| **10-12** | **Proofreader**      | Scribe is sleepy and making typos in his logbook. Help him fix his grammar and spelling.                                            |
| **13-15** | **Writer**           | Scribe needs to write an invitation to the Nut Festival. Give him a topic and let him draft the text.                               |
| **16-18** | **Rewriter**         | The invitation is too formal! Help Scribe rewrite it to sound "more fun" for the younger squirrels.                                 |
| **19-24** | **Prompt API**       | The final challenge: Ask Scribe’s internal "brain" (Gemini Nano) to solve riddles or logic puzzles to unlock the Great Oak Library. |

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

### 🐿️ Level 1: The Sorting Office

### Title: Identifying the Leaf-Mail

A mysterious gust of wind has blown letters from all over the forest into Scribe’s library. Before Scribe can reply, he needs to know what language they are written in! Your first task is to initialize the **Language Detector** and identify the language of the provided text.

---

### Challenge Instructions

To help Scribe, you must use the `window.LanguageDetector` API. Follow these steps:

1. **Check Availability:** First, verify if the model is available on the user's device using `LanguageDetector.availability()`.
2. **Create the Detector:** Use the `create()` method to initialize the detector.
3. **Detect the Language:** Call the `detect()` method on the string `leafMail`.

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
const leafMail = "Bonjour Scribe! Comment vas-tu?";

// 1. Create the detector
const detector = await LanguageDetector.create();

// 2. Detect the language of leafMail
const results = // Your code here

```

# Prompt to Cloude Opus 4.5

Help me to plan the implementation of this game. The idea is to create the core supporting 1 level and allow the addition of more levels later. The should include all the necesary core logic and it should be generic and reusable
