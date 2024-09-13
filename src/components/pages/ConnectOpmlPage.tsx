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
  const [file, setFile] = useState<File | null>(null);
  const [importIpfsPath, setImportIpfsPath] = useState("");
  const [isIpfsValid, setIsIpfsValid] = useState(false);
  const { opml, parseOpml } = useOpml();
  const { kuboClient, setOpmlIpfsPath } = useKubo();
  const { address } = useAccount();
  const { getIPFSAddress } = useDapp();

  useEffect(() => {
    handleGetIPFSAddressFromBlockchain();
  }, []);

  const handleGetIPFSAddressFromBlockchain = async () => {
    const ipfsAddress = await getIPFSAddress(address);
    if (ipfsAddress.length > 0) {
      // addAlert("IPFS address found from blockchain", "success");
      setImportIpfsPath(ipfsAddress);
      setIsIpfsValid(isValidCID(ipfsAddress));
    }
  };

  const handleImportFromLocal = async () => {
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
        <StyledInput
          type="file"
          width={"80%"}
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
        <StyledButton color={"blue"} onClick={handleImportFromLocal}>
          Import
        </StyledButton>
      </VStack>
      <StyledHeading paddingLeft={"4rem"}>OR</StyledHeading>
      <VStack align={"center"}>
        <InputGroup width={"80%"}>
          <StyledInput
            value={importIpfsPath}
            onChange={(e) => handleIpfsPathInput(e.target.value)}
          />
          <InputRightElement>
            {isIpfsValid ? (
              <CheckIcon color="green.500" />
            ) : (
              <CloseIcon color="red.500" />
            )}
          </InputRightElement>
        </InputGroup>
        <StyledButton color="blue" onClick={handleImportFromIpfs}>
          Import
        </StyledButton>
      </VStack>
    </div>
  );
};

export default ConnectOpmlPage;
