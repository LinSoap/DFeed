import "@rainbow-me/rainbowkit/styles.css";
import {
  Box,
  Grid,
  GridItem,
  Show,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import UserAlert from "../common/UserAlert";
import { useAlert } from "../providers/AlertProvider";
import PageHeader from "../common/PageHeader";
import WelcomePage from "./WelcomePage";

const Layout = () => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const location = useLocation();
  const isRoot = location.pathname === "/";
  const bgColorMain = theme.colors.custom.bgColorMain[colorMode];
  const bgColorAside = theme.colors.custom.bgColorAside[colorMode];
  const { alerts, removeAlert } = useAlert();

  return (
    <Grid
      templateAreas={{
        base: `"header"
                "main"`,
      }}
      templateColumns={{
        base: "1fr",
      }}
      height="100vh"
    >
      <Show above="lg">
        <GridItem area="header" bg={bgColorAside} position={"fixed"}>
          <PageHeader />
        </GridItem>
      </Show>
      <GridItem area="main" bg={bgColorMain} overflowY="auto">
        <Show below="lg">
          <Box bg={bgColorMain} width={"100%"}></Box>
          <Box marginBottom={70} />
        </Show>
        <Outlet />
        {isRoot && <WelcomePage />}
        <UserAlert alerts={alerts} onClose={removeAlert} />
      </GridItem>
    </Grid>
  );
};

export default Layout;
