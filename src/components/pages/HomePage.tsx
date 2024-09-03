import { useOpml } from "../providers/OpmlProvider";
import OpmlInfoList from "../common/OpmlInfoList";
import { Box, IconButton, Tooltip, VStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { BiExport } from "react-icons/bi";
import { SiIpfs } from "react-icons/si";
import { useState } from "react";
import AddOpmlListItemModal from "../common/AddOpmlListItemModal";
import { downloadFile } from "../../utils/file";
import { buildOpml } from "../../utils/opml";

const HomePage = () => {
  const { opml, uploadOpmlToIpfs, addOpmlGroup } = useOpml();
  const [isOpenAddOpmlListItem, setIsOpenAddOpmlListItem] = useState(false);

  return (
    <>
      <Box justifyContent="center" alignItems="center">
        <OpmlInfoList opml={opml} />
        <VStack spacing={4} position="fixed" bottom="20px" left="20px">
          <Tooltip label="Upload OPML to IPFS">
            <IconButton
              icon={<SiIpfs />}
              aria-label="Upload OPML to IPFS"
              zIndex="1000"
              onClick={() => {
                uploadOpmlToIpfs();
              }}
            />
          </Tooltip>
          <Tooltip label="Export OPML to local">
            <IconButton
              icon={<BiExport />}
              aria-label="Export OPML"
              zIndex="1000"
              onClick={() => {
                downloadFile(buildOpml(opml), "Ipfs-feed-box.OPML");
              }}
            />
          </Tooltip>
          <Tooltip label="Add Group">
            <IconButton
              icon={<AddIcon />}
              aria-label="Add Group"
              zIndex="1000"
              onClick={() =>
                addOpmlGroup({
                  outline: [],
                  _text: "New Group",
                  _title: "New Group",
                })
              }
            />
          </Tooltip>
          <Tooltip label="Add Item">
            <IconButton
              icon={<AddIcon />}
              aria-label="Add"
              zIndex="1000"
              onClick={() => setIsOpenAddOpmlListItem(true)}
            />
          </Tooltip>
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
