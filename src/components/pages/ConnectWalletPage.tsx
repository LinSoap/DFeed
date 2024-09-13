import { ConnectButton } from "@rainbow-me/rainbowkit";
import StyledHeading from "../styled/StyledHeading";
import { VStack, Text } from "@chakra-ui/react";

const ConnectWalletPage = () => {
  return (
    <div>
      <VStack paddingLeft={"1rem"} align={"start"}>
        <StyledHeading>Wallet</StyledHeading>
        <Text fontFamily={"Poppins"}>
          Please connect your crypto wallet for authentication and interaction
          with the smart contract to record the IPFS address of your OPML file.
        </Text>
      </VStack>
      <ConnectButton showBalance={false} />
    </div>
  );
};

export default ConnectWalletPage;
