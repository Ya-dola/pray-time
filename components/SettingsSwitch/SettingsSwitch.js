import { useEffect, useState } from "react";
import { Flex, Switch, Text } from "@radix-ui/themes";
import classNames from "classnames";
import styles from "@/components/ThemeControl/ThemeControl.module.css";

const SettingsSwitch = ({ getSwitchValue, setSwitchValue, enabled = true }) => {
  const labelClasses = classNames(styles.accentColor, styles.clickable);

  const [localSwitchVal, setLocalSwitchVal] = useState(false);

  useEffect(() => {
    setLocalSwitchVal(getSwitchValue);
  }, [getSwitchValue]);

  const handleSwitch = () => {
    if (!enabled) return;

    setLocalSwitchVal(!localSwitchVal);
    setSwitchValue(!localSwitchVal);
  };

  return (
    <Flex
      gap={"3"}
      wrap={"nowrap"}
      justify={"center"}
      className={styles.clickable}
      onClick={handleSwitch}
    >
      <Text as={"label"} className={labelClasses}>
        Off
      </Text>
      <Switch checked={localSwitchVal} disabled={!enabled} />
      <Text as={"label"} className={labelClasses}>
        On
      </Text>
    </Flex>
  );
};

export default SettingsSwitch;
