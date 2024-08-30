import { Moon, Sun } from "lucide-react";
import { useThemeContext } from "@/contexts/theme";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  const { setTheme } = useThemeContext();

  function handleThemeToggle(e: React.MouseEvent) {
    const el = e.target as SVGElement;
    if (el.id === "moon") setTheme("dark");
    if (el.id === "sun") setTheme("light");
  }

  return (
    <Button variant="outline" size="icon" onClick={handleThemeToggle}>
      <Moon
        id="moon"
        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Sun
        id="sun"
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
