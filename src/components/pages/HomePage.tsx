import { useOpml } from "../providers/OpmlProvider";
import OpmlInfoList from "../common/OpmlInfoList";
import { Box, IconButton, VStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { BiExport } from "react-icons/bi";
import { useState } from "react";
import AddOpmlListItemModal from "../common/AddOpmlListItemModal";
import { downloadFile } from "../../utils/file";
import { buildOpml } from "../../utils/opml";

const HomePage = () => {
  const { opml } = useOpml();
  const [isOpenAddOpmlListItem, setIsOpenAddOpmlListItem] = useState(false);

  console.log(opml);

  return (
    <>
      <Box justifyContent="center" alignItems="center">
        <OpmlInfoList opml={opml} />
        <VStack spacing={4} position="fixed" bottom="20px" right="20px">
          <IconButton
            icon={<BiExport />}
            aria-label="Export OPML"
            zIndex="1000"
            onClick={() => {
              downloadFile(buildOpml(opml), "Ipfs-feed-box.OPML");
            }}
          />
          <IconButton
            icon={<AddIcon />}
            aria-label="Add"
            zIndex="1000"
            onClick={() => setIsOpenAddOpmlListItem(true)}
          />
        </VStack>
        <AddOpmlListItemModal
          isOpen={isOpenAddOpmlListItem}
          onClose={() => setIsOpenAddOpmlListItem(false)}
        />
      </Box>
    </>
  );
};

export default HomePage;
