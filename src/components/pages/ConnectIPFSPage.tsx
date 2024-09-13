import { VStack, Text } from "@chakra-ui/react";
import { useKubo } from "../providers/KuboProvider";
import { useState } from "react";
import StyledInput from "../styled/StyledInput";
import StyledHeading from "../styled/StyledHeading";
import StyledButton from "../styled/StyledButton";

const ConnectIPFSPage = () => {
  const [kuboUrl, setKuboUrl] = useState("");
  const { connectKubo } = useKubo();
  return (
    <>
      <VStack paddingLeft={"2rem"} align={"start"}>
        <StyledHeading>IPFS</StyledHeading>
        <Text fontFamily={"Poppins"} fontSize={"16px"} marginRight={"1rem"}>
          Please connect to the IPFS network (Kubo node) to ensure proper
          uploading and access to the latest CID of your OPML file.
        </Text>
      </VStack>
      <VStack align={"center"} marginY={"1rem"}>
        <StyledInput
          value={kuboUrl}
          onChange={(e) => setKuboUrl(e.target.value)}
          placeholder="Kubo URL"
          width={"80%"}
          mx={4}
        />
        <StyledButton
          width={"10rem"}
          color={"blue"}
          onClick={() => connectKubo(kuboUrl)}
        >
          Connect
        </StyledButton>
      </VStack>
    </>
  );
};

export default ConnectIPFSPage;
