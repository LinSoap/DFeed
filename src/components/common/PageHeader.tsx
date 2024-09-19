import { Box, HStack, Text, useTheme } from "@chakra-ui/react";
import {
  useAccountModal,
  useChainModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit";
import { useLocation, useNavigate } from "react-router-dom";
import StyledButton from "../styled/StyledButton";
import { useAccount, useChainId, useChains } from "wagmi";
import { useKubo } from "../providers/KuboProvider";
import { useAlert } from "../providers/AlertProvider";
import { useState } from "react";

const PageHeader = () => {
  const theme = useTheme();
  const { addAlert } = useAlert();
  const location = useLocation();
  const navigate = useNavigate();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { address } = useAccount();
  const chiefAddress = address?.slice(0, 6) + "..." + address?.slice(-4);
  const chainId = useChainId();
  const chains = useChains();

  const chain = chains.find((c) => c.id === chainId);

  const { opmlIpfsPath } = useKubo();
  const cheifOpmlIpfsPath =
    opmlIpfsPath?.slice(0, 6) + "..." + opmlIpfsPath?.slice(-4);

  const [showFullPath, setShowFullPath] = useState(false);

  const copyIpfsPath = async () => {
    try {
      await navigator.clipboard.writeText(opmlIpfsPath);
      addAlert("IPFS address copied successfully", "success");
    } catch (err) {
      console.error("Copy failed:", err);
      addAlert("Failed to copy IPFS address", "error");
    }
  };

  return (
    <HStack
      justifyContent={"space-between"}
      paddingX={10}
      paddingY={1}
      position="sticky"
      top={0}
      zIndex={10}
      backdropFilter="blur(5px)"
      backgroundColor={
        location.pathname === "/"
          ? theme.colors.custom.themeColor["gray"]
          : "rgba(255, 255, 255, 0.8)"
      }
    >
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
        {opmlIpfsPath && (
          <StyledButton
            color={"red"}
            onClick={copyIpfsPath}
            onMouseEnter={() => setShowFullPath(true)}
            onMouseLeave={() => setShowFullPath(false)}
          >
            <Text userSelect="all">
              {showFullPath ? opmlIpfsPath : cheifOpmlIpfsPath}
            </Text>
          </StyledButton>
        )}
        {openConnectModal && (
          <StyledButton color={"blue"} onClick={openConnectModal}>
            Connect Wallet
          </StyledButton>
        )}
        {openChainModal && (
          <StyledButton color={"red"} onClick={openChainModal}>
            {chain?.name}
          </StyledButton>
        )}
        {openAccountModal && (
          <StyledButton color={"red"} onClick={openAccountModal}>
            {chiefAddress}
          </StyledButton>
        )}
      </Box>
    </HStack>
  );
};

export default PageHeader;
