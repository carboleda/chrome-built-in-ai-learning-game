# 🐿️ Scribe's AI Adventure

An interactive learning game to help developers master Chrome's Built-In AI APIs, inspired by [Flexbox Froggy](https://flexboxfroggy.com/).

## 🎮 Concept

**Scribe the Squirrel** is the official librarian of the Great Oak Forest. Every day, animals send messages via "Leaf-Mail." Players write JavaScript code using Chrome's Built-In AI APIs to help Scribe process, translate, and generate text.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Chrome with [Built-In AI features](https://developer.chrome.com/docs/ai/built-in) enabled

### Installation

```bash
npm install
npm run dev
```

Open http://localhost:5173 in Chrome.

### Production Build

```bash
npm run build
```

Static files are output to `dist/` for deployment on Firebase Hosting, GitHub Pages, etc.

## 📁 Project Structure

```
src/
├── engine/                    # Core game engine
│   ├── types.ts               # Type definitions (Level, ValidationResult, etc.)
│   ├── codeRunner.ts          # Safe user code execution with timeout
│   ├── validator.ts           # Level validation utilities
│   └── index.ts               # Module exports
│
├── store/
│   └── gameStore.ts           # Zustand state management
│
├── data/levels/
│   ├── index.ts               # Level registry
│   └── level-01.ts            # Level 1: LanguageDetector API
│
├── components/
│   ├── Layout/
│   │   └── SplitPane.tsx      # 50/50 split layout
│   ├── CodeEditor/
│   │   └── CodeEditor.tsx     # Monaco editor wrapper
│   ├── GameView/
│   │   ├── LevelScene.tsx     # Main game visualization
│   │   ├── ProgressIndicator.tsx
│   │   └── ScribeCharacter.tsx
│   ├── LevelInfo/
│   │   ├── LevelHeader.tsx    # Level title and API badge
│   │   └── Instructions.tsx   # Markdown instructions renderer
│   └── ApiWarning/
│       └── ApiWarning.tsx     # Chrome AI availability banner
│
├── utils/
│   └── apiDetection.ts        # Chrome AI API detection
│
├── App.tsx                    # Main application component
├── main.tsx                   # Entry point
└── index.css                  # Global styles (Tailwind)
```

## 🧩 Adding New Levels

1. Create a new level file in `src/data/levels/`:

```typescript
// src/data/levels/level-02.ts
import type {
  Level,
  ExecutionResult,
  ValidationResult,
} from "../../engine/types";

const instructions = `
## Level Title

Your markdown instructions here...
`;

const starterCode = `// Starter code for the player
`;

async function validate(
  userCode: string,
  executionResult: ExecutionResult,
): Promise<ValidationResult> {
  let progress = 0;
  const total = 3; // Number of steps

  // Your validation logic here...

  return { progress, total, complete: progress === total };
}

export const level02: Level = {
  id: 2,
  title: "Your Level Title",
  api: "Translator", // The API being taught
  instructions,
  starterCode,
  context: {}, // Variables injected into user code context
  captureVariables: ["variableName"], // Variables to capture for validation
  validate,
};
```

2. Register in `src/data/levels/index.ts`:

```typescript
import { level02 } from "./level-02";

export const levels: Level[] = [
  level01,
  level02, // Add here
];
```

## 🗺️ Level Roadmap

| Levels | API              | Description                                  |
| ------ | ---------------- | -------------------------------------------- |
| 1-3    | LanguageDetector | Sort Leaf-Mail by detected language          |
| 4-6    | Translator       | Translate messages between forest languages  |
| 7-9    | Summarizer       | Create TL;DR summaries of long documents     |
| 10-12  | Proofreader      | Fix grammar and spelling in Scribe's logbook |
| 13-15  | Writer           | Draft invitations and announcements          |
| 16-18  | Rewriter         | Adjust tone and style of messages            |
| 19-24  | Prompt API       | Solve riddles using Gemini Nano              |

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **Vite** - Build tool
- **Monaco Editor** - Code editor
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Markdown** - Instructions rendering

## 📝 License

MIT
