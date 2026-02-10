/**
 * Zustand store for game state management
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Level, ValidationResult, ExecutionResult } from "../engine/types";
import { executeUserCode } from "../engine/codeRunner";
import { validateLevel } from "../engine/validator";
import {
  getLevelById,
  getNextLevel,
  getFirstLevel,
  levels,
} from "../data/levels/index";

/**
 * Game store state interface
 */
interface GameState {
  /** Current level being played */
  currentLevel: Level | null;
  /** User's code in the editor */
  userCode: string;
  /** Current validation result */
  validationResult: ValidationResult | null;
  /** Whether code is currently executing */
  isExecuting: boolean;
  /** Last execution error message */
  executionError: string | null;
  /** IDs of completed levels */
  completedLevels: number[];
  /** Solutions for completed levels (levelId -> code) */
  levelSolutions: Record<number, string>;
}

/**
 * Game store actions interface
 */
interface GameActions {
  /** Initialize the game with the first level */
  initGame: () => void;
  /** Set the current level by ID */
  setLevel: (levelId: number) => void;
  /** Update the user's code */
  setCode: (code: string) => void;
  /** Execute the user's code and validate */
  runCode: () => Promise<void>;
  /** Move to the next level */
  nextLevel: () => void;
  /** Reset the current level to starter code */
  resetLevel: () => void;
  /** Clear all progress */
  resetProgress: () => void;
}

type GameStore = GameState & GameActions;

/** Storage key for persisted state */
const STORAGE_KEY = "babels-signal-routing";

/**
 * Initial state
 */
const initialState: GameState = {
  currentLevel: null,
  userCode: "",
  validationResult: null,
  isExecuting: false,
  executionError: null,
  completedLevels: [],
  levelSolutions: {},
};

/**
 * Zustand store with persistence for completed levels
 */
export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      initGame: () => {
        const { completedLevels } = get();

        // Find the first uncompleted level, or fallback to first level
        const firstUncompletedLevel = levels.find(
          (level) => !completedLevels.includes(level.id),
        );
        const targetLevel = firstUncompletedLevel ?? getFirstLevel();

        if (targetLevel) {
          set({
            currentLevel: targetLevel,
            userCode: targetLevel.starterCode,
            validationResult: null,
            executionError: null,
          });
        }
      },

      setLevel: (levelId: number) => {
        const { completedLevels, levelSolutions } = get();
        const level = getLevelById(levelId);
        if (level) {
          // Load saved solution if level was completed, otherwise use starter code
          const savedSolution = levelSolutions[levelId];
          const isCompleted = completedLevels.includes(levelId);
          set({
            currentLevel: level,
            userCode: savedSolution ?? level.starterCode,
            validationResult: isCompleted
              ? { progress: level.totalSteps, complete: true }
              : null,
            executionError: null,
          });
        }
      },

      setCode: (code: string) => {
        set({ userCode: code, executionError: null });
      },

      runCode: async () => {
        const { currentLevel, userCode } = get();
        if (!currentLevel || get().isExecuting) return;

        set({ isExecuting: true, executionError: null });

        try {
          // Execute user's code
          const executionResult: ExecutionResult = await executeUserCode(
            userCode,
            currentLevel.context,
            currentLevel.captureVariables,
          );

          // Validate the result
          const validationResult = await validateLevel(
            currentLevel,
            userCode,
            executionResult,
          );

          // If completed, add to completed levels and save/update solution
          if (validationResult.complete) {
            const { completedLevels, levelSolutions } = get();
            const updates: Partial<GameState> = {
              levelSolutions: {
                ...levelSolutions,
                [currentLevel.id]: userCode,
              },
            };
            if (!completedLevels.includes(currentLevel.id)) {
              updates.completedLevels = [...completedLevels, currentLevel.id];
            }
            set(updates);
          }

          set({
            validationResult,
            executionError: executionResult.error?.message ?? null,
            isExecuting: false,
          });
        } catch (error) {
          set({
            executionError:
              error instanceof Error ? error.message : "Unknown error",
            isExecuting: false,
            validationResult: null,
          });
        }
      },

      nextLevel: () => {
        const { currentLevel } = get();
        if (!currentLevel) return;

        const next = getNextLevel(currentLevel.id);
        if (next) {
          set({
            currentLevel: next,
            userCode: next.starterCode,
            validationResult: null,
            executionError: null,
          });
        }
      },

      resetLevel: () => {
        const { currentLevel } = get();
        if (currentLevel) {
          set({
            userCode: currentLevel.starterCode,
            validationResult: null,
            executionError: null,
            completedLevels: get().completedLevels.filter(
              (id) => id !== currentLevel.id,
            ),
            levelSolutions: Object.fromEntries(
              Object.entries(get().levelSolutions).filter(
                ([id]) => Number(id) !== currentLevel.id,
              ),
            ),
          });
        }
      },

      resetProgress: () => {
        set({ completedLevels: [] });
        get().initGame();
      },
    }),
    {
      name: STORAGE_KEY,
      // Persist completedLevels and solutions
      partialize: (state) => ({
        completedLevels: state.completedLevels,
        levelSolutions: state.levelSolutions,
      }),
    },
  ),
);
