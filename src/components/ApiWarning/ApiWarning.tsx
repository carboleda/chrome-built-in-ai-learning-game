/**
 * ApiWarning Component
 *
 * Displays a warning banner when Chrome AI APIs are not available.
 */

import { useState } from "react";
import { isAnyApiAvailable } from "../../utils/apiDetection";

export function ApiWarning() {
  const [dismissed, setDismissed] = useState(false);
  const isAvailable = isAnyApiAvailable();

  if (isAvailable || dismissed) {
    return null;
  }

  return (
    <div className="relative bg-amber-600 px-4 py-3 text-center text-sm text-white">
      <strong>Chrome AI APIs not detected.</strong> This game requires Chrome
      with Built-In AI features enabled.
      <a
        href="https://developer.chrome.com/docs/ai/built-in"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-2 underline hover:text-amber-200"
      >
        Learn more
      </a>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-lg hover:text-amber-200"
        aria-label="Dismiss warning"
      >
        ×
      </button>
    </div>
  );
}
