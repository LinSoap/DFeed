import { Box, HStack } from "@chakra-ui/react";
import { useAccountModal, useChainModal } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";
import StyledButton from "../styled/StyledButton";
import { useAccount, useChainId, useChains } from "wagmi";

const PageHeader = () => {
  const navigate = useNavigate();
  const { openChainModal } = useChainModal();
  const { openAccountModal } = useAccountModal();
  const { address } = useAccount();
  const chiefAddress = address?.slice(0, 6) + "..." + address?.slice(-4);
  const chainId = useChainId();
  const chains = useChains();

  const chain = chains.find((c) => c.id === chainId);

  return (
    <HStack justifyContent={"space-between"} paddingX={10} paddingY={1}>
      <Box display={"flex"} gap={2}>
        <button
          onClick={() => navigate("/")}
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <img
            src="/logo.svg"
            alt="logo"
            style={{ width: "4rem", height: "4rem" }}
          />
        </button>
      </Box>
      <Box display={"flex"} gap={2}>
        <StyledButton color="blue" onClick={() => navigate("/connect/wallet")}>
          Connect
        </StyledButton>
        <StyledButton color="red" onClick={() => openChainModal?.()}>
          {chain?.name}
        </StyledButton>
        <StyledButton color="blue" onClick={() => openAccountModal?.()}>
          {chiefAddress}
        </StyledButton>
      </Box>
    </HStack>
  );
};

export default PageHeader;
