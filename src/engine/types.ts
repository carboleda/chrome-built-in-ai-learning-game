/**
 * Core type definitions for Scribe's AI Adventure
 */

/**
 * Supported Chrome Built-In AI APIs
 */
export type AIApiType =
  | "LanguageDetector"
  | "Translator"
  | "Summarizer"
  | "Proofreader"
  | "Writer"
  | "Rewriter"
  | "LanguageModel";

/**
 * Result of validating user's code submission
 */
export interface ValidationResult {
  /** Number of completed steps */
  progress: number;
  /** Total steps required */
  total: number;
  /** Whether all steps are complete */
  complete: boolean;
  /** Optional message to display to user */
  message?: string;
}

/**
 * Result of executing user's code
 */
export interface ExecutionResult {
  /** Whether execution completed without errors */
  success: boolean;
  /** The final result/return value from user's code */
  result: unknown;
  /** Any error that occurred during execution */
  error: Error | null;
  /** Captured variable instances for validation (e.g., detector, results) */
  capturedInstances: Record<string, unknown>;
}

/**
 * Context variables provided to user's code
 */
export type LevelContext = Record<string, unknown>;

/**
 * Validation function signature for levels
 */
export type ValidateFunction = (
  userCode: string,
  executionResult: ExecutionResult,
) => Promise<ValidationResult>;

/**
 * Level definition structure
 */
export interface Level {
  /** Unique level identifier */
  id: number;
  /** Display title for the level */
  title: string;
  /** Which Chrome AI API this level teaches */
  api: AIApiType;
  /** Markdown instructions for the player */
  instructions: string;
  /** Initial code shown in the editor */
  starterCode: string;
  /** Variables provided to user's code execution context */
  context: LevelContext;
  /** Names of variables to capture from user's code for validation */
  captureVariables: string[];
  /** Function to validate user's solution */
  validate: ValidateFunction;
}

/**
 * Game state for persistence
 */
export interface GameProgress {
  /** IDs of completed levels */
  completedLevels: number[];
  /** Current level being played */
  currentLevelId: number;
}
