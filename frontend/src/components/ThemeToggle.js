import React from "react";

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <div className="flex justify-end p-4">
      <button
        aria-label="Toggle Dark Mode"
        className="transition-all duration-200 rounded-full bg-futuristic-card dark:bg-dark-bg border-2 border-neon-purple px-4 py-2 shadow-neon text-neon-blue hover:bg-neon-blue hover:text-white font-bold tracking-wider"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <span className="flex items-center gap-2">
            <svg width="20" height="20" fill="currentColor" className="inline" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.22a1 1 0 10-1.44 1.44l.71.7a1 1 0 001.44-1.43zm4.28 5.78a1 1 0 00-1-1h-1a1 1 0 100 2h1a1 1 0 001-1zm-2.22 4.22a1 1 0 00-1.44 1.44l.71.7a1 1 0 101.44-1.43zm-5.78 4.28a1 1 0 00-1 1v1a1 1 0 102 0v-1a1 1 0 00-1-1zm-4.22-2.22a1 1 0 101.44-1.44l-.71-.7a1 1 0 10-1.44 1.43zm-4.28-5.78a1 1 0 001 1h1a1 1 0 100-2h-1a1 1 0 00-1 1zm2.22-4.22a1 1 0 001.44-1.44l-.71-.7a1 1 0 10-1.44 1.43zM10 6a4 4 0 100 8 4 4 0 000-8z" /></svg>
            Light
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <svg width="20" height="20" fill="currentColor" className="inline" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
            Dark
          </span>
        )}
      </button>
    </div>
  );
}