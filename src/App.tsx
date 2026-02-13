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
import { Instructions } from "./components/LevelInfo/Instructions";
import { ApiWarning } from "./components/ApiWarning/ApiWarning";
import { MainHeader } from "./components/GameView/MainHeader";
import { ProgressFeedback } from "./components/GameView/ProgressFeedback";

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
              <MainHeader />
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

              {/* Progress Feedback - fixed height at bottom */}
              <div className="flex-0 border-t border-(--color-terminal-light)/30">
                {/* Progress Feedback Component */}
                <ProgressFeedback />
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default App;
