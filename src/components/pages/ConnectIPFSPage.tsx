import { Button } from "@chakra-ui/react";
import { useKubo } from "../providers/KuboProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StyledInput from "../styled/StyledInput";

const ConnectIPFSPage = () => {
  const [kuboUrl, setKuboUrl] = useState("");
  const navigate = useNavigate();
  const { connectKubo } = useKubo();
  return (
    <div>
      <StyledInput
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
