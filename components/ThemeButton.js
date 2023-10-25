import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { IconButton, Tooltip } from "@radix-ui/themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const iconSize = 20;

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
      {/*TODO - Give Label to Icon Button*/}
      <Tooltip content={"Change Theme"}>
        <IconButton variant={"surface"} onClick={changeTheme}>
          {theme === "light" ? (
            <MoonIcon width={iconSize} height={iconSize} />
          ) : (
            <SunIcon width={iconSize} height={iconSize} />
          )}
        </IconButton>
      </Tooltip>
    </div>
  );
};
export default ThemeButton;
