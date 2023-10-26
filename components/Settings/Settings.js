import {
  Blockquote,
  Card,
  Flex,
  Heading,
  Inset,
  Separator,
  Text,
} from "@radix-ui/themes";
import LocationBar from "@/components/LocationBar/LocationBar";
import ThemeControl from "@/components/ThemeControl/ThemeControl";
import styles from "./Settings.module.css";

const Settings = () => {
  return (
    <Card size={"3"}>
      {/*TODO - Fix Card Sizing to look like an actual card*/}
      <Flex gap={"4"} direction={"column"} wrap={"nowrap"}>
        <Heading as={"h2"} size={"7"}>
          Settings
        </Heading>
        <Blockquote size={"2"} className={styles.blockQuote}>
          Adjust your Preferences Here
        </Blockquote>
        <Inset py={"current"} mb={"4"}>
          <Separator orientation={"horizontal"} size={"4"} />
        </Inset>

        <Flex gap={"8"} wrap={"nowrap"} justify={"between"}>
          <Text as={"label"} size={"3"}>
            Theme
          </Text>
          <ThemeControl version={"switch"} />
        </Flex>
        <Inset py={"current"} mb={"4"}>
          <Separator orientation={"horizontal"} size={"4"} />
        </Inset>

        <LocationBar />
        <Inset py={"current"} mb={"4"}>
          <Separator orientation={"horizontal"} size={"4"} />
        </Inset>

        <Text as={"label"} size={"3"}>
          Notification Frequency
        </Text>
        <Inset py={"current"} mb={"4"}>
          <Separator orientation={"horizontal"} size={"4"} />
        </Inset>
        {/*TODO - Add Notifications Frequency Component*/}
      </Flex>
    </Card>
  );
};
export default Settings;
