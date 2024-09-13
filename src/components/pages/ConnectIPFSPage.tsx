import { Button } from "@chakra-ui/react";
import { useKubo } from "../providers/KuboProvider";
import { useState } from "react";
import StyledInput from "../styled/StyledInput";

const ConnectIPFSPage = () => {
  const [kuboUrl, setKuboUrl] = useState("");
  const { connectKubo } = useKubo();
  return (
    <div>
      <StyledInput
        value={kuboUrl}
        onChange={(e) => setKuboUrl(e.target.value)}
        placeholder="Kubo URL"
      />
      <Button onClick={() => connectKubo(kuboUrl)}>Connect</Button>
    </div>
  );
};

export default ConnectIPFSPage;
