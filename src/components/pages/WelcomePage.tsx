import { Box, Button, useTheme } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { useKubo } from "../providers/KuboProvider";

const WelcomePage = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { isConnectedKubo, opmlIpfsPath } = useKubo();
  const theme = useTheme();
  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      backgroundColor={theme.colors.custom.themeColor["gray"]}
    >
      <Button
        onClick={() => {
          if (isConnected && isConnectedKubo && opmlIpfsPath) {
            navigate("/home");
          } else {
            navigate("/connect/wallet");
          }
        }}
      >
        Start!
      </Button>
    </Box>
  );
};

export default WelcomePage;
