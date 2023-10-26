import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Flex, IconButton, Switch, Text, Tooltip } from "@radix-ui/themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import styles from "./ThemeControl.module.css";
import classNames from "classnames";

const ThemeControl = ({ version = "icon", className, size = "2" }) => {
  const { theme, setTheme } = useTheme();
  const iconSize = 22;

  // Mount is for Hydration Checks for theme to work properly
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Ensures Component is Mounted before proceeding
  if (!mounted) return null;

  const changeTheme = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");

  const themeIconButton = () => {
    return (
      <div className={className}>
        <Tooltip content={"Change Theme"}>
          <IconButton variant={"soft"} size={size} onClick={changeTheme}>
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

  const themeSwitch = () => {
    const labelClasses = classNames(styles.accentColor, styles.clickable);

    return (
      <div className={className}>
        <Flex
          gap={"3"}
          wrap={"wrap"}
          justify={"center"}
          onClick={changeTheme}
          className={styles.clickable}
        >
          <SunIcon
            width={iconSize}
            height={iconSize}
            className={styles.accentColor}
          />
          <Text as={"label"} className={labelClasses}>
            Light Mode
          </Text>
          <Switch checked={theme === "dark"} />
          <Text as={"label"} className={labelClasses}>
            Dark Mode
          </Text>
          <MoonIcon
            width={iconSize}
            height={iconSize}
            className={styles.accentColor}
          />
        </Flex>
      </div>
    );
  };

  switch (version) {
    case "switch":
      return themeSwitch();
    default:
      return themeIconButton();
  }
};

export default ThemeControl;
