import { useEffect, useState } from "react";
import classNames from "classnames";
import { Flex, Switch, Text } from "@radix-ui/themes";
import styles from "./SettingsSwtich.module.css";

const SettingsSwitch = ({
  getSwitchValue,
  setSwitchValue,
  enabled = true,
  onClick, // onClick event handler for the component
  preDefinedSwitchVal,
}) => {
  const labelClasses = classNames(styles.accentColor, styles.clickable);

  const [localSwitchVal, setLocalSwitchVal] = useState(false);

  useEffect(() => {
    setLocalSwitchVal(getSwitchValue);

    if (preDefinedSwitchVal) setLocalSwitchVal(preDefinedSwitchVal);
  }, [getSwitchValue, preDefinedSwitchVal]);

  const handleSwitch = () => {
    if (!enabled) return;

    setLocalSwitchVal(!localSwitchVal);
    setSwitchValue(!localSwitchVal);

    // Call the onClick event handler with value of the switch if exists
    if (onClick) {
      onClick(!localSwitchVal);
    }
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
