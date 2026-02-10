/**
 * Babel's Signal Routing
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
import { LevelNavigator } from "./components/LevelNavigator/LevelNavigator";

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
    <div className="flex h-screen flex-col overflow-hidden">
      <ApiWarning />
      <div className="flex-1 overflow-hidden">
        <SplitPane
          left={
            <div className="flex h-full flex-col overflow-hidden">
              {/* Game Title Header */}
              <div className="flex items-top justify-between border-b border-(--color-terminal-light)/30 bg-(--color-terminal-dark) px-4 py-3">
                <h1 className="text-2xl font-bold text-white">
                  🛰️ Babel's Signal Routing
                </h1>
                <LevelNavigator />
              </div>
              <LevelHeader level={currentLevel} />
              {/* Code Editor - center */}
              <div className="min-h-0 flex-5">
                <CodeEditor />
              </div>
              {/* Game Scene - bottom */}
              <div className="flex-4 border-t border-(--color-terminal-light)/30 overflow-auto">
                <LevelScene />
              </div>
            </div>
          }
          right={
            <div className="flex h-full flex-col overflow-hidden">
              {/* Instructions - full height, scrollable */}
              <div className="min-h-0 flex-1 overflow-auto">
                <Instructions content={currentLevel.instructions} />
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default App;
