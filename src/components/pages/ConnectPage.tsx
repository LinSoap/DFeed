import { Outlet, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { useKubo } from "../providers/KuboProvider";
import { useOpml } from "../providers/OpmlProvider";
import StyledCard from "../styled/StyledCard";
import StyledButton from "../styled/StyledButton";
import { VStack } from "@chakra-ui/react";

const ConnectPage = () => {
  const { isConnected } = useAccount();
  const { isConnectedKubo } = useKubo();
  const { opml } = useOpml();

  const navigate = useNavigate();

  return (
    <VStack>
      <StyledCard
        display={"flex"}
        justifyContent={"center"}
        align={"center"}
        // flexDirection={"column"}
        paddingY={"5%"}
        marginLeft={"auto"}
        marginRight={"auto"}
        backgroundColor={"#f4f4f4"}
        maxWidth={"30rem"}
        width={"100%"}
      >
        <Outlet />
      </StyledCard>
      <StyledButton
        color={"red"}
        isDisabled={!isConnected || !isConnectedKubo || !opml}
        onClick={() => navigate("/home")}
      >
        Start
      </StyledButton>
    </VStack>
  );
};

export default ConnectPage;
