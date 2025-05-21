import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-1 rounded-md text-sm hover:bg-white hover:text-black dark:hover:bg-gray-700 transition-all"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <>
          <Sun size={18} />
          <span>Light</span>
        </>
      ) : (
        <>
          <Moon size={18} />
          <span>Dark</span>
        </>
      )}
    </button>
  );
}

export default ThemeToggleButton;
