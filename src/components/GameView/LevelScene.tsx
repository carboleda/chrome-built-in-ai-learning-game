/**
 * LevelScene Component
 *
 * Main game visualization area containing Babel and progress indicators.
 */

import { CodeEditor } from "../CodeEditor/CodeEditor.tsx";
import { DebugConsole } from "./DebugConsole.tsx";

export function LevelScene() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-5 min-h-0">
        <CodeEditor />
      </div>
      <div className="flex-3 min-h-0">
        <DebugConsole />
      </div>
    </div>
  );
}
