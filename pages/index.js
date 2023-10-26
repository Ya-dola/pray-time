import { Box, Container, Flex, Tabs } from "@radix-ui/themes";
import { GearIcon, HomeIcon } from "@radix-ui/react-icons";
import Layout from "@/components/Layout/Layout";
import Home from "@/components/Home/Home";
import Settings from "@/components/Settings/Settings";
import styles from "./index.module.css";
import ThemeButton from "@/components/ThemeButton";

const metadata = { title: "Pray Time", description: "App Page" };

const Index = () => {
  const TABS = {
    HOME: "home",
    SETTINGS: "settings",
  };

  const iconSize = 26;

  return (
    <Layout metadata={metadata}>
      <Tabs.Root defaultValue={"home"}>
        <Tabs.List className={styles.tabList}>
          <div className={styles.tabLeftSpace}></div>
          <Flex gap={"9"} wrap={"nowrap"}>
            <Tabs.Trigger value={"home"}>
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
          <ThemeButton className={styles.tabThemeBtn} size={"3"} />
        </Tabs.List>
        <Container py={"4"}>
          <Tabs.Content value={TABS.HOME}>
            <Home />
          </Tabs.Content>
          <Tabs.Content value={TABS.SETTINGS}>
            <Settings />
            {/*TODO - FIX Height Size*/}
          </Tabs.Content>
        </Container>
      </Tabs.Root>
    </Layout>
  );
};

export default Index;
