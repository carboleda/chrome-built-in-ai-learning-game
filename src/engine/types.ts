/**
 * Core type definitions for Babel's Signal Routing
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

export const AIApiUrls: Record<AIApiType, string> = {
  LanguageDetector:
    "https://developer.chrome.com/docs/ai/language-detection#run_the_language_detector",
  Translator:
    "https://developer.chrome.com/docs/ai/translator-api#language-support",
  Summarizer:
    "https://developer.chrome.com/docs/ai/summarizer-api#api-functions",
  Proofreader:
    "https://developer.chrome.com/docs/ai/proofreader-api#use_the_proofreader_api",
  Writer: "https://developer.chrome.com/docs/ai/writer-api#use_the_writer_api",
  Rewriter:
    "https://developer.chrome.com/docs/ai/rewriter-api#use_the_rewriter_api",
  LanguageModel:
    "https://developer.chrome.com/docs/ai/prompt-api#model_parameters",
};

/**
 * Result of validating user's code submission
 */
export interface ValidationResult {
  /** Number of completed steps */
  progress: number;
  /** Whether all steps are complete */
  complete: boolean;
  /** Optional message to display to user */
  message?: string;
  expectedOutput?: unknown;
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
  /** Total number of validation steps for this level */
  totalSteps: number;
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
