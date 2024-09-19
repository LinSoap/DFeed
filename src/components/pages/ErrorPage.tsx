import { Box, Img, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import StyledHeading from "../styled/StyledHeading";
import StyledButton from "../styled/StyledButton";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" py={10} px={6}>
      <VStack spacing={8}>
        <Img src="/logo.svg" boxSize="20rem" />
        <StyledHeading>😢Opps! something worng.</StyledHeading>
        <StyledButton color="red" onClick={() => navigate("/")}>
          Back Home
        </StyledButton>
      </VStack>
    </Box>
  );
};

export default ErrorPage;
