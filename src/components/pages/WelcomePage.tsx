import { Box, VStack, Text, useTheme } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { useKubo } from "../providers/KuboProvider";
import StyledHeading from "../styled/StyledHeading";
import StyledButton from "../styled/StyledButton";

const WelcomePage = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { isConnectedKubo, opmlIpfsPath } = useKubo();
  const theme = useTheme();

  return (
    <Box
      width="100vw"
      height="100vh"
      backgroundColor={theme.colors.custom.themeColor["gray"]}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={8} textAlign="center">
        <StyledHeading fontSize={"5rem"}>DFeed</StyledHeading>
        <Text
          fontFamily={"Poppins"}
          fontSize="xl"
          color="black"
          maxWidth="600px"
        >
          DFeed leverages IPFS storage and blockchain wallet address mapping to
          offer a decentralized RSS feed management service. Users can log in
          via their wallet to upload, manage, and update OPML files, ensuring
          that each update automatically points to the latest IPFS path.
        </Text>
        <StyledButton
          color={"red"}
          size="lg"
          onClick={() => {
            if (isConnected && isConnectedKubo && opmlIpfsPath) {
              navigate("/home");
            } else {
              navigate("/connect/wallet");
            }
          }}
        >
          Start!
        </StyledButton>
      </VStack>
    </Box>
  );
};

export default WelcomePage;
