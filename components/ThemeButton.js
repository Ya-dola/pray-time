import { useTheme } from "next-themes";
import { IconButton } from "@radix-ui/themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  // Mount is for Hydration Checks for theme to work properly
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const changeTheme = () => {
    return theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div>
      <IconButton onClick={changeTheme}>
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
      </IconButton>
    </div>
  );
};
export default ThemeButton;
