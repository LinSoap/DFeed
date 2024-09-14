import { Outlet, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { useKubo } from "../providers/KuboProvider";
import { useOpml } from "../providers/OpmlProvider";
import StyledCard from "../styled/StyledCard";
import StyledButton from "../styled/StyledButton";
import { HStack, IconButton, VStack } from "@chakra-ui/react";
import StyledHeading from "../styled/StyledHeading";
import { FaAngleLeft, FaAngleRight, FaStar } from "react-icons/fa";

const ConnectPage = () => {
  const { isConnected } = useAccount();
  const { isConnectedKubo } = useKubo();
  const { opml } = useOpml();

  const navigate = useNavigate();

  const pages = ["/connect/wallet", "/connect/ipfs", "/connect/opml"];
  const currentIndex = pages.indexOf(window.location.pathname);

  return (
    <VStack>
      <StyledHeading fontSize={"80px"}>Conncect</StyledHeading>
      <StyledCard
        display={"flex"}
        position={"relative"}
        paddingY={"2%"}
        marginLeft={"auto"}
        marginRight={"auto"}
        backgroundColor={"#f4f4f4"}
        maxWidth={"40rem"}
        minHeight={"27rem"}
        width={"100%"}
      >
        <Outlet />
        <VStack
          position={"absolute"}
          bottom={"20px"}
          left={"50%"}
          transform={"translateX(-50%)"}
        >
          <HStack>
            <FaStar
              color={isConnected ? "#FFD700" : "black"}
              size={
                window.location.pathname === "/connect/wallet" ? "20px" : "16px"
              }
              style={{ transition: "color 0.3s ease" }}
            />
            <FaStar
              color={isConnectedKubo ? "#FFD700" : "black"}
              size={
                window.location.pathname === "/connect/ipfs" ? "20px" : "16px"
              }
              style={{ transition: "color 0.3s ease" }}
            />
            <FaStar
              color={opml ? "#FFD700" : "black"}
              size={
                window.location.pathname === "/connect/opml" ? "20px" : "16px"
              }
              style={{ transition: "color 0.3s ease" }}
            />
          </HStack>
          <StyledButton
            color={"red"}
            isDisabled={!isConnected || !isConnectedKubo || !opml}
            onClick={() => navigate("/home")}
          >
            Start
          </StyledButton>
        </VStack>

        <IconButton
          icon={<FaAngleLeft />}
          position={"absolute"}
          border={"2px solid black"}
          borderRadius={"100%"}
          backgroundColor={"white"}
          justifyContent={"center"}
          height={"3rem"}
          width={"3rem"}
          left={"-25px"}
          top={"50%"}
          transform={"translateY(-50%)"}
          aria-label={""}
          onClick={() =>
            navigate(pages[(currentIndex - 1 + pages.length) % pages.length])
          }
        />
        <IconButton
          icon={<FaAngleRight />}
          position={"absolute"}
          border={"2px solid black"}
          borderRadius={"100%"}
          backgroundColor={"white"}
          justifyContent={"center"}
          height={"3rem"}
          width={"3rem"}
          right={"-25px"}
          top={"50%"}
          transform={"translateY(-50%)"}
          aria-label={""}
          onClick={() => navigate(pages[(currentIndex + 1) % pages.length])}
        />
      </StyledCard>
    </VStack>
  );
};

export default ConnectPage;
