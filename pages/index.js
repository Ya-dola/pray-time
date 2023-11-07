import { useRef } from "react";
import { Box, Flex, Tabs } from "@radix-ui/themes";
import { GearIcon, HomeIcon } from "@radix-ui/react-icons";
import Layout from "@/components/Layout/Layout";
import Home from "@/components/Home/Home";
import Settings from "@/components/Settings/Settings";
import ThemeControl from "@/components/ThemeControl/ThemeControl";
import styles from "./index.module.css";

const metadata = { title: "Pray Time", description: "App Page" };

const Index = () => {
  const TABS = {
    HOME: "home",
    SETTINGS: "settings",
  };

  const iconSize = 26;

  const homeTabRef = useRef(null);

  return (
    <Layout metadata={metadata}>
      <Tabs.Root defaultValue={"home"}>
        <Tabs.List className={styles.tabList}>
          <div className={styles.tabLeftSpace}></div>

          <Flex wrap={"nowrap"} className={styles.tabsPages}>
            <Tabs.Trigger value={TABS.HOME} ref={homeTabRef}>
              <Flex gap={"3"} align={"center"} justify={"center"}>
                <HomeIcon width={iconSize} height={iconSize} />
                Home
              </Flex>
            </Tabs.Trigger>
            <Tabs.Trigger value={TABS.SETTINGS}>
              <Flex gap={"3"} align={"center"} justify={"center"}>
                <GearIcon width={iconSize} height={iconSize} />
                Settings
              </Flex>
            </Tabs.Trigger>
          </Flex>
          <ThemeControl className={styles.tabThemeBtn} size={"3"} />
        </Tabs.List>

        <Box py={"4"}>
          <Tabs.Content value={TABS.HOME} className={styles.homeTab}>
            <Home />
          </Tabs.Content>
          <Tabs.Content value={TABS.SETTINGS} className={styles.settingsTab}>
            <Settings homeTabRef={homeTabRef} />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Layout>
  );
};

export default Index;
