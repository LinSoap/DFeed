import { Button, Input } from "@chakra-ui/react";
import { useKubo } from "../providers/KuboProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConnectIPFSPage = () => {
  const [kuboUrl, setKuboUrl] = useState("");
  const navigate = useNavigate();
  const { connectKubo } = useKubo();
  return (
    <div>
      <Input
        value={kuboUrl}
        onChange={(e) => setKuboUrl(e.target.value)}
        placeholder="Kubo URL"
      />
      <Button onClick={() => connectKubo(kuboUrl)}>Connect</Button>
      <Button onClick={() => navigate("/connect/opml")}>Next Step</Button>
    </div>
  );
};

export default ConnectIPFSPage;
