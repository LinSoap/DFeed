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
import ImportOpml from "../common/ImportOpml";

const ConnectPage = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const [gatewayUrl, setGatewayUrl] = useState("");
  const { kuboClient, connectKubo, isConnectedKubo, opmlIpfsPath } = useKubo();

  console.log(kuboClient);

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
      <ImportOpml />
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
