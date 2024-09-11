import { Moon, Sun } from "lucide-react";
import { useThemeContext } from "@/contexts/theme";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  const { setTheme } = useThemeContext();

  return (
    <div>
      <Button
        className="dark:hidden"
        variant="outline"
        size="icon"
        onClick={() => setTheme("dark")}
      >
        <Moon id="moon" />
      </Button>
      <Button
        className="hidden dark:inline-flex"
        variant="outline"
        size="icon"
        onClick={() => setTheme("light")}
      >
        <Sun id="sun" />
      </Button>
      <span className="sr-only">Toggle theme</span>
    </div>
  );
}
