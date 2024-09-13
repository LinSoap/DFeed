import { Button, VStack, Text } from "@chakra-ui/react";
import { useKubo } from "../providers/KuboProvider";
import { useState } from "react";
import StyledInput from "../styled/StyledInput";
import StyledHeading from "../styled/StyledHeading";

const ConnectIPFSPage = () => {
  const [kuboUrl, setKuboUrl] = useState("");
  const { connectKubo } = useKubo();
  return (
    <>
      <VStack paddingLeft={"1rem"} align={"start"}>
        <StyledHeading>IPFS</StyledHeading>
        <Text fontFamily={"Poppins"} fontSize={"16px"}>
          Please connect to the IPFS network (Kubo node) to ensure proper
          uploading and access to the latest CID of your OPML file.
        </Text>
      </VStack>
      <StyledInput
        value={kuboUrl}
        onChange={(e) => setKuboUrl(e.target.value)}
        placeholder="Kubo URL"
      />
      <Button onClick={() => connectKubo(kuboUrl)}>Connect</Button>
    </>
  );
};

export default ConnectIPFSPage;
