import { useState } from "react";
import {
  Blockquote,
  Button,
  Card,
  Flex,
  Heading,
  Inset,
  ScrollArea,
  Separator,
  Text,
} from "@radix-ui/themes";
import {
  getNotifyLastThird,
  getShowLastThird,
  getShowSunrise,
  setNotifyLastThird,
  setShowLastThird,
  setShowSunrise,
} from "@/utils/cookieUtils";
import LocationBar from "@/components/LocationBar/LocationBar";
import ThemeControl from "@/components/ThemeControl/ThemeControl";
import NotifFrequency from "@/components/NotifFrequency/NotifFrequency";
import SettingsSwitch from "@/components/SettingsSwitch/SettingsSwitch";
import styles from "./Settings.module.css";

const Settings = ({ homeTabRef }) => {
  const [localShowLastThird, setLocalShowLastThird] = useState(
    getShowLastThird(),
  );
  const [localNotifyLastThird, setLocalNotifyLastThird] = useState(
    getNotifyLastThird(),
  );

  const handleSaveBtn = () => {
    if (homeTabRef.current) {
      homeTabRef.current.focus();
      homeTabRef.current.click();
    }
  };

  return (
    <Card size={"3"} className={styles.card}>
      <Inset>
        <ScrollArea
          type={"hover"}
          scrollbars={"vertical"}
          size={"2"}
          radius={"full"}
          className={styles.scrollArea}
        >
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

            <Flex gap={"2"} wrap={"nowrap"} justify={"between"}>
              <Text as={"label"} size={"3"}>
                Show Last Third of Night Time
              </Text>
              <SettingsSwitch
                getSwitchValue={getShowLastThird}
                setSwitchValue={setShowLastThird}
                onClick={(switchVal) => {
                  setLocalShowLastThird(switchVal);
                  setLocalNotifyLastThird(switchVal);
                }}
              />
            </Flex>
            <Inset py={"current"} mb={"4"}>
              <Separator orientation={"horizontal"} size={"4"} />
            </Inset>

            <Flex gap={"2"} wrap={"nowrap"} justify={"between"}>
              <Text as={"label"} size={"3"}>
                Enable Last Third of Night Notifications
              </Text>
              <SettingsSwitch
                getSwitchValue={getNotifyLastThird}
                setSwitchValue={setNotifyLastThird}
                enabled={localShowLastThird}
                preDefinedSwitchVal={localNotifyLastThird}
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
        </ScrollArea>
      </Inset>
    </Card>
  );
};
export default Settings;
