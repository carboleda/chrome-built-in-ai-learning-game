import { FiGithub } from "react-icons/fi";

export const Footer = () => {
  return (
    <footer className="border-t border-(--color-terminal-light)/30 bg-black/20 px-4 py-2 text-center text-sm text-gray-400">
      <div className="flex items-center justify-center gap-2">
        <span>Created by Carlos Arboleda</span>
        <a
          href="https://github.com/carboleda/chrome-built-in-ai-learning-game"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <FiGithub size={16} />
          GitHub
        </a>
      </div>
    </footer>
  );
};
