# �️ Babel's Signal Routing

An interactive learning game to help developers master Chrome's Built-In AI APIs, inspired by [Flexbox Froggy](https://flexboxfroggy.com/).

## 🎮 Concept

**Babel the Signal-Bot** is a small, retro-futuristic robot floating in a digital "Cloud Terminal." Every moment, massive amounts of data flow through the internet. Players write JavaScript code using Chrome's Built-In AI APIs to help Babel route, translate, and process data packets to keep the digital world running smoothly.

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
│   │   └── ScribeCharacter.tsx  # Babel character visualization
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

| Levels | API              | Module                | Description                                           |
| ------ | ---------------- | --------------------- | ----------------------------------------------------- |
| 1-3    | LanguageDetector | Sensor Array          | Identify incoming data packets by language            |
| 4-6    | Translator       | Universal Bridge      | Translate signals between different digital languages |
| 7-9    | Summarizer       | Data Compaction       | Shrink massive server logs into digestible pings      |
| 10-12  | Proofreader      | Protocol Refinement   | Clean corrupted data and fix typos in messages        |
| 13-15  | Writer           | Signal Synthesis      | Generate new data packets from scratch                |
| 16-18  | Rewriter         | Signal Transformation | Adjust tone and format of data packets                |
| 19-24  | Prompt API       | Core Intelligence     | Solve complex logic puzzles with Gemini Nano          |

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
