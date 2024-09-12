import "@rainbow-me/rainbowkit/styles.css";
import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import UserAlert from "../common/UserAlert";
import { useAlert } from "../providers/AlertProvider";
import PageHeader from "../common/PageHeader";
import WelcomePage from "./WelcomePage";

const Layout = () => {
  const location = useLocation();
  const isRoot = location.pathname === "/";
  const hideLocation = [
    "/",
    "/connect",
    "/connect/wallet",
    "/connect/ipfs",
    "/connect/opml",
  ];
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
      width="100vw"
    >
      {!hideLocation.includes(location.pathname) ? (
        <GridItem area="header" position={"fixed"} w="100%" h="50px">
          <PageHeader />
        </GridItem>
      ) : null}
      <GridItem area="main" bg={"white"} overflowY="auto">
        <Outlet />
        {isRoot && <WelcomePage />}
        <UserAlert alerts={alerts} onClose={removeAlert} />
      </GridItem>
    </Grid>
  );
};

export default Layout;
