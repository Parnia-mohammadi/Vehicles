import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";

function ThemeToggleButton({ className = "" }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={() => toggleTheme()}
      className={`flex items-center gap-x-1 rounded-md text-sm transition-all ${className}`}
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
