import { useOpml } from "../providers/OpmlProvider";
import OpmlInfoList from "../common/OpmlInfoList";
import { Box, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import AddOpmlListItemModal from "../common/AddOpmlListItemModal";

const HomePage = () => {
  const { opml } = useOpml();
  const [isOpenAddOpmlListItem, setIsOpenAddOpmlListItem] = useState(false);

  return (
    <>
      <Box justifyContent="center" alignItems="center">
        <OpmlInfoList opml={opml} />
        <IconButton
          icon={<AddIcon />}
          position="fixed"
          bottom="20px"
          right="20px"
          aria-label="Add"
          zIndex="1000"
          onClick={() => setIsOpenAddOpmlListItem(true)}
        />
        <AddOpmlListItemModal
          isOpen={isOpenAddOpmlListItem}
          onClose={() => setIsOpenAddOpmlListItem(false)}
        />
      </Box>
    </>
  );
};

export default HomePage;
