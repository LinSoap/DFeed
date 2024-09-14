import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { InputGroup, InputRightElement, VStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { readFileToString } from "../../utils/file";
import { catFileFromPath, isValidCID } from "../../utils/kubo";
import { validateXML } from "../../utils/opml";
import { useAlert } from "../providers/AlertProvider";
import { useKubo } from "../providers/KuboProvider";
import { useOpml } from "../providers/OpmlProvider";
import { useDapp } from "../providers/DappProvider";
import { useAccount } from "wagmi";
import StyledInput from "../styled/StyledInput";
import StyledHeading from "../styled/StyledHeading";
import StyledButton from "../styled/StyledButton";

const ConnectOpmlPage = () => {
  const { addAlert } = useAlert();
  const [importIpfsPath, setImportIpfsPath] = useState("");
  const [isIpfsValid, setIsIpfsValid] = useState(false);
  const { opml, parseOpml } = useOpml();
  const { kuboClient, setOpmlIpfsPath } = useKubo();
  const { address, isConnected } = useAccount();
  const { getIPFSAddress } = useDapp();

  useEffect(() => {
    if (isConnected) {
      handleGetIPFSAddressFromBlockchain();
    }
  }, []);

  const handleGetIPFSAddressFromBlockchain = async () => {
    const ipfsAddress = await getIPFSAddress(address);
    if (ipfsAddress.length > 0) {
      // addAlert("IPFS address found from blockchain", "success");
      setImportIpfsPath(ipfsAddress);
      setIsIpfsValid(isValidCID(ipfsAddress));
    }
  };

  const handleImportFromLocal = async (file: File) => {
    if (!file) {
      addAlert("Please select a file", "warning");
      return;
    }
    if (!file.name.toLowerCase().endsWith(".opml")) {
      addAlert("Please select a valid OPML file", "warning");
      return;
    }
    const opmlText = await readFileToString(file);
    if (!validateXML(opmlText)) {
      addAlert("Invalid OPML file", "warning");
      return;
    }
    const res = await kuboClient?.add(file);
    await parseOpml(opmlText);
    console.log(opml);
    setOpmlIpfsPath(res.path);
    addAlert("OPML file imported successfully", "success");
  };

  const handleImportFromIpfs = async () => {
    if (isIpfsValid) {
      const res = await catFileFromPath(importIpfsPath, kuboClient);
      const opmlText = new TextDecoder().decode(res);
      await parseOpml(opmlText);
      console.log(opml);
      setOpmlIpfsPath(importIpfsPath);
    } else {
      addAlert("Invalid IPFS path", "warning");
      return;
    }
    addAlert("OPML file imported successfully", "success");
  };

  const handleIpfsPathInput = async (path: string) => {
    setImportIpfsPath(path);
    setIsIpfsValid(isValidCID(path));
  };

  const handleFileSelect = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".opml";
    fileInput.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        handleImportFromLocal(target.files[0]);
      }
    };
    fileInput.click();
  };

  return (
    <div>
      <VStack paddingLeft={"2rem"} align={"start"}>
        <StyledHeading>OPML</StyledHeading>
        <Text fontFamily={"Poppins"} fontSize={"16px"} marginRight={"1rem"}>
          Please upload the local OPML file or provide its IPFS address. We will
          parse and record its IPFS address, allowing you to easily manage your
          RSS subscription content.
        </Text>
      </VStack>
      <VStack align={"center"}>
        <StyledButton width={"10rem"} color={"blue"} onClick={handleFileSelect}>
          Select File
        </StyledButton>
        <StyledHeading fontSize={"28px"} paddingTop={"2px"}>
          OR
        </StyledHeading>
      </VStack>

      <VStack justify="center" width="100%">
        <InputGroup width={"75%"}>
          <StyledInput
            placeholder={"IPFS Path"}
            value={importIpfsPath}
            onChange={(e) => handleIpfsPathInput(e.target.value)}
          />
          <InputRightElement>
            {isIpfsValid ? (
              <CheckIcon color="black" />
            ) : (
              <CloseIcon color="black" />
            )}
          </InputRightElement>
        </InputGroup>
        <StyledButton
          width={"10rem"}
          color="blue"
          onClick={handleImportFromIpfs}
        >
          Import
        </StyledButton>
      </VStack>
    </div>
  );
};

export default ConnectOpmlPage;
