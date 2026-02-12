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
} from "../levels/index";

// Debounce timer for autosaving user's code per-level
let saveTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Game store state interface
 */
interface GameState {
  /** Current level being played */
  currentLevel: Level | null;
  /** ID of the current level (persistable) */
  currentLevelId: number | null;
  /** Current code for the active level (source of truth) */
  currentLevelCode: string;
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
  /** Return current code for the active level */
  getCurrentLevelCode: () => string;
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
  currentLevelId: null,
  currentLevelCode: "",
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
        const { completedLevels, currentLevelId } = get();

        // Prefer restoring the last viewed level if available
        const persistedLevel = currentLevelId
          ? getLevelById(currentLevelId)
          : null;

        // Find the first uncompleted level, or fallback to first level
        const firstUncompletedLevel = levels.find(
          (level) => !completedLevels.includes(level.id),
        );

        const targetLevel =
          persistedLevel ?? firstUncompletedLevel ?? getFirstLevel();

        if (targetLevel) {
          // If a saved solution exists for the restored level, load it
          const saved = get().levelSolutions[targetLevel.id];
          const isCompleted = completedLevels.includes(targetLevel.id);
          set({
            currentLevel: targetLevel,
            currentLevelId: targetLevel.id,
            currentLevelCode: saved ?? targetLevel.starterCode,
            validationResult: isCompleted
              ? { progress: targetLevel.totalSteps, complete: true }
              : null,
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
            currentLevelId: level.id,
            currentLevelCode: savedSolution ?? level.starterCode,
            validationResult: isCompleted
              ? { progress: level.totalSteps, complete: true }
              : null,
            executionError: null,
          });
        }
      },

      setCode: (code: string) => {
        // Update current level code immediately
        set({ currentLevelCode: code, executionError: null });

        // Debounce persisting the current code into levelSolutions to avoid
        // writing on every keystroke. Uses the current level id as the key.
        if (saveTimer) clearTimeout(saveTimer);
        saveTimer = setTimeout(() => {
          const { currentLevelId, levelSolutions } = get();
          if (currentLevelId) {
            // Persist the latest editor contents for the current level
            set({
              levelSolutions: {
                ...levelSolutions,
                [currentLevelId]: get().currentLevelCode,
              },
            });
          }
          saveTimer = null;
        }, 700);
      },

      getCurrentLevelCode: () => {
        return get().currentLevelCode;
      },

      runCode: async () => {
        const { currentLevel, currentLevelCode } = get();
        if (!currentLevel || get().isExecuting) return;

        set({ isExecuting: true, executionError: null });

        try {
          // Execute user's code
          const executionResult: ExecutionResult = await executeUserCode(
            currentLevelCode,
            currentLevel.context,
            currentLevel.captureVariables,
          );

          // Validate the result
          const validationResult = await validateLevel(
            currentLevel,
            currentLevelCode,
            executionResult,
          );

          // If completed, add to completed levels and save/update solution
          if (validationResult.complete) {
            const { completedLevels, levelSolutions } = get();
            const updates: Partial<GameState> = {
              levelSolutions: {
                ...levelSolutions,
                [currentLevel.id]: currentLevelCode,
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
          get().setLevel(next.id);
        }
      },

      resetLevel: () => {
        const { currentLevel } = get();
        if (currentLevel) {
          set({
            currentLevelCode: currentLevel.starterCode,
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
      // Persist completedLevels, solutions, and last viewed level id
      partialize: (state) => ({
        completedLevels: state.completedLevels,
        levelSolutions: state.levelSolutions,
        currentLevelId: state.currentLevelId,
      }),
    },
  ),
);
