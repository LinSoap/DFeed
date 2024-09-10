import { Button, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useKubo } from "../providers/KuboProvider";
import { useState } from "react";

const ConnectIPFSPage = () => {
  const navigate = useNavigate();
  const [kuboUrl, setKuboUrl] = useState("");
  const { isConnectedKubo, connectKubo } = useKubo();
  return (
    <div>
      <Input
        value={kuboUrl}
        onChange={(e) => setKuboUrl(e.target.value)}
        placeholder="Kubo URL"
      />
      <Button onClick={() => connectKubo(kuboUrl)}>Connect</Button>
      <Button
        isDisabled={!isConnectedKubo}
        onClick={() => navigate("/connect/opml")}
      >
        Next Step
      </Button>
    </div>
  );
};

export default ConnectIPFSPage;
