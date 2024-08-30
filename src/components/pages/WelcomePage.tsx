import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button onClick={() => navigate("/connect")}>Connect</Button>
    </>
  );
};

export default WelcomePage;
