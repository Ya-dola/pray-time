import {
  Blockquote,
  Button,
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
import NotifFrequency from "@/components/NotifFrequency/NotifFrequency";
import SettingsSwitch from "@/components/SettingsSwitch/SettingsSwitch";
import {
  getNotifyLastThird,
  getShowLastThird,
  getShowSunrise,
  setNotifyLastThird,
  setShowLastThird,
  setShowSunrise,
} from "@/utils/cookieUtils";

const Settings = ({ homeTabRef }) => {
  const handleSaveBtn = () => {
    if (homeTabRef.current) {
      homeTabRef.current.focus();
      homeTabRef.current.click();
    }
  };

  return (
    <Card size={"3"} className={styles.card}>
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

        <Flex gap={"2"} wrap={"nowrap"} justify={"between"}>
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

        <Flex gap={"2"} wrap={"nowrap"} justify={"between"}>
          <Text as={"label"} size={"3"}>
            Notification Frequency
          </Text>
          <NotifFrequency />
        </Flex>
        <Inset py={"current"} mb={"4"}>
          <Separator orientation={"horizontal"} size={"4"} />
        </Inset>
        {/*TODO - Setup Notifications Frequency Logic for Notifications*/}

        <Flex gap={"2"} wrap={"nowrap"} justify={"between"}>
          <Text as={"label"} size={"3"}>
            Show Sunrise Time
          </Text>
          <SettingsSwitch
            getSwitchValue={getShowSunrise}
            setSwitchValue={setShowSunrise}
          />
        </Flex>
        <Inset py={"current"} mb={"4"}>
          <Separator orientation={"horizontal"} size={"4"} />
        </Inset>
        {/*TODO - Add Logic for Showing Sunrise Prayer Card*/}

        <Flex gap={"2"} wrap={"nowrap"} justify={"between"}>
          <Text as={"label"} size={"3"}>
            Show Last Third of Night Time
          </Text>
          <SettingsSwitch
            getSwitchValue={getShowLastThird}
            setSwitchValue={setShowLastThird}
          />
        </Flex>
        <Inset py={"current"} mb={"4"}>
          <Separator orientation={"horizontal"} size={"4"} />
        </Inset>
        {/*TODO - Add Logic for Showing Last Third Prayer Card*/}

        <Flex gap={"2"} wrap={"nowrap"} justify={"between"}>
          <Text as={"label"} size={"3"}>
            Enable Last Third of Night Notifications
          </Text>
          <SettingsSwitch
            getSwitchValue={getNotifyLastThird}
            setSwitchValue={setNotifyLastThird}
          />
        </Flex>
        <Inset py={"current"} mb={"4"}>
          <Separator orientation={"horizontal"} size={"4"} />
        </Inset>
        {/*TODO - Add Logic for Last Third Notifications*/}

        <Button size={{ initial: "2", sm: "3" }} onClick={handleSaveBtn}>
          Save Preferences
        </Button>
        <Inset py={"current"} mb={"4"}>
          <Separator orientation={"horizontal"} size={"4"} />
        </Inset>
      </div>
    </Card>
  );
};
export default Settings;
