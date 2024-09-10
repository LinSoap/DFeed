import { Box, HStack } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";
import StyledButton from "./StyledButton";

const PageHeader = () => {
  const navigate = useNavigate();
  return (
    <HStack justifyContent={"space-between"} paddingX={10} paddingY={1}>
      <Box display={"flex"} gap={2}>
        <StyledButton color="red" onClick={() => navigate("/")}>
          Home
        </StyledButton>
        <StyledButton color="blue" onClick={() => navigate("/connect/wallet")}>
          Connect
        </StyledButton>
      </Box>
      <Box>
        <ConnectButton chainStatus="icon" showBalance={false} />
      </Box>
    </HStack>
  );
};

export default PageHeader;
