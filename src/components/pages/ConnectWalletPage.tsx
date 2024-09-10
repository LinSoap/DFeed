import { Button } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

const ConnectWalletPage = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  return (
    <div>
      <ConnectButton showBalance={false} />
      <Button
        isDisabled={!isConnected}
        onClick={() => navigate("/connect/ipfs")}
      >
        Next Step
      </Button>
    </div>
  );
};

export default ConnectWalletPage;
