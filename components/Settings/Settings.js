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
    <Card size={"3"} className={styles.card}>
      {/*TODO - Fix Card Sizing to look like an actual card*/}
      <div className={styles.cardLayout}>
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
        </Flex>

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
      </div>
    </Card>
  );
};
export default Settings;
