import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { useKubo } from "../providers/KuboProvider";

const WelcomePage = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { isConnectedKubo, opmlIpfsPath } = useKubo();
  return (
    <>
      <Button
        onClick={() => {
          if (isConnected && isConnectedKubo && opmlIpfsPath) {
            navigate("/home");
          } else {
            navigate("/connect/wallet");
          }
        }}
      >
        Start!
      </Button>
    </>
  );
};

export default WelcomePage;
