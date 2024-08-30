import { Button, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const PageHeader = () => {
  const navigate = useNavigate();
  return (
    <HStack>
      <Button onClick={() => navigate("/")}>Home</Button>
      <Button onClick={() => navigate("/connect")}>Connect</Button>
    </HStack>
  );
};

export default PageHeader;
