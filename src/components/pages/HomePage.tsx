import { useOpml } from "../providers/OpmlProvider";
import OpmlInfoList from "../common/OpmlInfoList";
import { Box } from "@chakra-ui/react";

const HomePage = () => {
  const { opml } = useOpml();

  return (
    <>
      <Box justifyContent="center" alignItems="center">
        <OpmlInfoList opml={opml} />
      </Box>
    </>
  );
};

export default HomePage;
