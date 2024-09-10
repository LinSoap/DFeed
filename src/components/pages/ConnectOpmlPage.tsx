import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ImportOpml from "../common/ImportOpml";
import { useOpml } from "../providers/OpmlProvider";

const ConnectOpmlPage = () => {
  const navigate = useNavigate();
  const { opml } = useOpml();
  return (
    <div>
      <ImportOpml />
      <Button isDisabled={!opml} onClick={() => navigate("/home")}>
        Go to Home
      </Button>
    </div>
  );
};

export default ConnectOpmlPage;
