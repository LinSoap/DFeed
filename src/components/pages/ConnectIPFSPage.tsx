import { VStack, Text, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useKubo } from "../providers/KuboProvider";
import { useState } from "react";
import StyledInput from "../styled/StyledInput";
import StyledHeading from "../styled/StyledHeading";
import StyledButton from "../styled/StyledButton";
import { validateUrl } from "../../utils/kubo";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useAlert } from "../providers/AlertProvider";

const ConnectIPFSPage = () => {
  const [kuboUrl, setKuboUrl] = useState("");
  const { addAlert } = useAlert();
  const { connectKubo } = useKubo();
  const [isUrlValidate, setIsUrlValidate] = useState(false);

  const handleClickButton = async (kuboUrl: string) => {
    try {
      await connectKubo(kuboUrl);
      addAlert("Connect Kubo RPC Succeed", "success");
    } catch (error) {
      addAlert("Connect Kubo RPC Failed", "error");
    }
  };

  const handleKuboURLInput = (url: string) => {
    setKuboUrl(url);
    setIsUrlValidate(validateUrl(url));
  };

  return (
    <>
      <VStack paddingLeft={"2rem"} align={"start"}>
        <StyledHeading>IPFS</StyledHeading>
        <Text fontFamily={"Poppins"} fontSize={"16px"} marginRight={"1rem"}>
          Please connect to the IPFS network (Kubo node) to ensure proper
          uploading and access to the latest CID of your OPML file.
        </Text>
      </VStack>
      <VStack align={"center"} marginY={"5rem"}>
        <InputGroup width={"75%"}>
          <StyledInput
            placeholder="KuboRPC URL,Default:http://127.0.0.1:5001"
            value={kuboUrl}
            onChange={(e) => handleKuboURLInput(e.target.value)}
          />
          <InputRightElement>
            {isUrlValidate ? (
              <CheckIcon color="black" />
            ) : (
              <CloseIcon color="black" />
            )}
          </InputRightElement>
        </InputGroup>
        <StyledButton
          width={"10rem"}
          color={"blue"}
          onClick={() => handleClickButton(kuboUrl)}
        >
          Connect
        </StyledButton>
      </VStack>
    </>
  );
};

export default ConnectIPFSPage;
