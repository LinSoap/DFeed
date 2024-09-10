import { Outlet, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { useKubo } from "../providers/KuboProvider";
import { useOpml } from "../providers/OpmlProvider";
import { Button } from "@chakra-ui/react";

const ConnectPage = () => {
  const { isConnected } = useAccount();
  const { isConnectedKubo } = useKubo();
  const { opml } = useOpml();

  const navigate = useNavigate();

  return (
    <>
      <p>Connect</p>
      <Outlet />
      <Button
        isDisabled={!isConnected || !isConnectedKubo || !opml}
        onClick={() => navigate("/home")}
      >
        Start
      </Button>
    </>
  );
};

export default ConnectPage;
