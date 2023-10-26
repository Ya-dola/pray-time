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

const Settings = () => {
  const iconSize = 24;

  return (
    <Card size={"3"}>
      <Flex gap={"4"} direction={"column"} wrap={"nowrap"}>
        <Heading as={"h2"} size={"7"}>
          Settings
        </Heading>
        <Blockquote size={"2"} color={"default"}>
          Adjust your Preferences Here
        </Blockquote>
        <Inset py={"current"} mb={"4"}>
          <Separator orientation={"horizontal"} size={"4"} />
        </Inset>
        <LocationBar />
        <Text as={"label"} size={"3"}>
          Notification Frequency
        </Text>
        {/*TODO - Add Notifications Frequency Component*/}
        <Text as={"label"} size={"3"}>
          Theme
        </Text>
        {/*TODO - Add Notifications Frequency Component*/}
      </Flex>
    </Card>
  );
};
export default Settings;
