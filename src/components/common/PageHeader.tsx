import { Box, Button, HStack } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";

const PageHeader = () => {
  const navigate = useNavigate();
  return (
    <HStack justifyContent={"space-between"} paddingX={10} paddingY={1}>
      <Box display={"flex"} gap={2}>
        <Button onClick={() => navigate("/")}>Home</Button>
        <Button onClick={() => navigate("/connect/wallet")}>Connect</Button>
      </Box>
      <Box>
        <ConnectButton chainStatus="icon" showBalance={false} />
      </Box>
    </HStack>
  );
};

export default PageHeader;
