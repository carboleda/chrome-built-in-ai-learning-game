import { LevelNavigator } from "../LevelNavigator/LevelNavigator";
import { levels } from "../../levels";
import { useGameStore } from "../../store/gameStore";
import { LevelHeader } from "../LevelInfo/LevelHeader";

export const MainHeader = () => {
  const { completedLevels, currentLevel } = useGameStore();

  return (
    <>
      <div className="border-b border-(--color-terminal-light)/30 bg-(--color-terminal-dark) px-4 py-2">
        <div className="flex flex-row w-full items-center justify-between">
          <h1 className="flex gap-2 mb-1 text-2xl font-bold text-white items-end">
            Babel's Signal Routing
            <span className="text-sm text-gray-400">v{__APP_VERSION__}</span>
          </h1>
          <span className="text-sm text-gray-400">
            {completedLevels.length}/{levels.length} completed
          </span>
        </div>
        <LevelNavigator />
      </div>
      <LevelHeader level={currentLevel!} />
    </>
  );
};
