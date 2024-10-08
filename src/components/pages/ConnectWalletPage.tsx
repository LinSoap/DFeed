import {
  useAccountModal,
  useChainModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit";
import StyledHeading from "../styled/StyledHeading";
import { VStack, Text } from "@chakra-ui/react";
import StyledButton from "../styled/StyledButton";
import { useAccount, useChainId, useChains } from "wagmi";

const ConnectWalletPage = () => {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();

  const { address } = useAccount();
  const chiefAddress = address?.slice(0, 6) + "..." + address?.slice(-4);
  const chainId = useChainId();
  const chains = useChains();

  const chain = chains.find((c) => c.id === chainId);

  return (
    <VStack height={"100%"}>
      <VStack paddingLeft={"2rem"} align={"start"}>
        <StyledHeading>Wallet</StyledHeading>
        <Text fontFamily={"Poppins"} fontSize={"16px"} marginRight={"1rem"}>
          Please connect your crypto wallet for authentication and interaction
          with the smart contract to record the IPFS address of your OPML file.
        </Text>
      </VStack>
      <VStack marginTop={"3rem"}>
        {openConnectModal && (
          <StyledButton
            marginTop={"1rem"}
            width={"10rem"}
            color={"blue"}
            onClick={openConnectModal}
          >
            Connect
          </StyledButton>
        )}
        {openAccountModal && (
          <StyledButton
            width={"10rem"}
            color={"blue"}
            onClick={openAccountModal}
          >
            {chiefAddress}
          </StyledButton>
        )}
        {openChainModal && (
          <StyledButton width={"10rem"} color={"blue"} onClick={openChainModal}>
            {chain?.name}
          </StyledButton>
        )}
      </VStack>
    </VStack>
  );
};

export default ConnectWalletPage;
