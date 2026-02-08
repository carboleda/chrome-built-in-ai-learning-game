/**
 * Scribe's AI Adventure
 *
 * Main application component that orchestrates the game.
 */

import { useEffect } from "react";
import { useGameStore } from "./store/gameStore";
import { SplitPane } from "./components/Layout/SplitPane";
import { CodeEditor } from "./components/CodeEditor/CodeEditor";
import { LevelScene } from "./components/GameView/LevelScene";
import { LevelHeader } from "./components/LevelInfo/LevelHeader";
import { Instructions } from "./components/LevelInfo/Instructions";
import { ApiWarning } from "./components/ApiWarning/ApiWarning";

function App() {
  const { currentLevel, initGame } = useGameStore();

  // Initialize game on mount
  useEffect(() => {
    initGame();
  }, [initGame]);

  // Loading state
  if (!currentLevel) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <ApiWarning />
      <div className="flex-1">
        <SplitPane
          left={
            <div className="flex h-full flex-col">
              <LevelHeader level={currentLevel} />
              {/* Code Editor - center */}
              <div className="flex-1">
                <CodeEditor />
              </div>
            </div>
          }
          right={
            <div className="flex h-full flex-col">
              {/* Instructions - top, scrollable */}
              <div className="max-h-[60%] overflow-auto border-b border-[var(--color-forest-light)]/30">
                <Instructions content={currentLevel.instructions} />
              </div>
              {/* Game Scene with progress */}
              <div className="flex-1">
                <LevelScene />
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default App;
