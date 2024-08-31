import { useState } from "react";
import { useAccount } from "wagmi";
import { useKubo } from "../providers/KuboProvider";
import {
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  HStack,
  Button,
  Text,
} from "@chakra-ui/react";
import { FaLink } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAlert } from "../providers/AlertProvider";
import { downloadFile, readFileToString } from "../../utils/file";
import { validateXML } from "../../utils/opml";
import { useOpml } from "../providers/OpmlProvider";
import { catFileFromPath } from "../../utils/kubo";

const ConnectPage = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const [gatewayUrl, setGatewayUrl] = useState("");
  const {
    kuboClient,
    connectKubo,
    isConnectedKubo,
    opmlIpfsPath,
    setOpmlIpfsPath,
  } = useKubo();
  const { opml, parseOpml } = useOpml();
  const [file, setFile] = useState<File | null>(null);
  const { addAlert } = useAlert();

  const handleImport = async () => {
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

  const handleExport = async () => {
    if (!opmlIpfsPath) {
      addAlert("Please import a file first", "warning");
      return;
    }
    const res = await catFileFromPath(opmlIpfsPath, kuboClient);
    downloadFile(res, "header.opml");
  };

  return (
    <>
      <ConnectButton showBalance={false} />
      {isConnected && <p>Welcome:{address}</p>}
      <InputGroup size="md">
        <Input
          value={gatewayUrl}
          onChange={(e) => setGatewayUrl(e.target.value)}
          placeholder="Enter Kubo gateway URL"
        />
        <InputRightElement width="4.5rem">
          <IconButton
            h="1.75rem"
            size="sm"
            icon={<FaLink />}
            onClick={() => connectKubo(gatewayUrl)}
            aria-label="Connect to Kubo"
          ></IconButton>
        </InputRightElement>
      </InputGroup>
      {isConnectedKubo && <p>kubo is available</p>}
      <Input
        type="file"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      />
      <p>{opmlIpfsPath}</p>
      <Button onClick={handleImport}>Import</Button>
      <Button onClick={handleExport}>Export</Button>
      <HStack>
        <Text>
          {isConnected && isConnectedKubo
            ? "Welcome, press the button to go to home"
            : "Please connect to Kubo"}
        </Text>
        <Button
          isDisabled={!isConnected || !isConnectedKubo || !opmlIpfsPath}
          onClick={() => navigate("/home")}
        >
          Go to Home
        </Button>
      </HStack>
    </>
  );
};

export default ConnectPage;
