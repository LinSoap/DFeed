import { Button } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";

const ConnectWalletPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ConnectButton showBalance={false} />
      <Button onClick={() => navigate("/connect/ipfs")}>Next Step</Button>
    </div>
  );
};

export default ConnectWalletPage;
