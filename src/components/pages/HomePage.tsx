import { useOpml } from "../providers/OpmlProvider";
import OpmlInfoList from "../common/OpmlInfoList";
import { Box, VStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { BiExport } from "react-icons/bi";
import { SiIpfs } from "react-icons/si";
import { useState } from "react";
import { downloadFile } from "../../utils/file";
import { buildOpml } from "../../utils/opml";
import AddFeedModal from "../common/AddFeedModal";
import { FaEthereum } from "react-icons/fa";
import FloatIconButton from "../common/FloatIconButton";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import SyncBlockChainModal from "../common/SyncBlockChainModal";

const HomePage = () => {
  const { opml, uploadOpmlToIpfs, addOpmlGroup } = useOpml();
  const [isOpenAddOpmlListItem, setIsOpenAddOpmlListItem] = useState(false);
  const [isOpenSyncBlockChain, setIsOpenSyncBlockChain] = useState(false);

  return (
    <>
      <Box paddingX={"25%"}>
        <OpmlInfoList opml={opml} />

        <VStack spacing={4} position="fixed" bottom="20px" left="20px">
          <FloatIconButton
            icon={<FaEthereum />}
            label="Sync IPFS Path to Blockchain"
            onClick={() => setIsOpenSyncBlockChain(true)}
          />
          <FloatIconButton
            icon={<SiIpfs />}
            label="Upload OPML to IPFS"
            onClick={() => {
              uploadOpmlToIpfs();
            }}
          />
          <FloatIconButton
            icon={<BiExport />}
            label="Export OPML to local"
            onClick={() => {
              downloadFile(buildOpml(opml), "Ipfs-feed-box.OPML");
            }}
          />
          <FloatIconButton
            icon={<MdOutlinePlaylistAdd />}
            label="Add Group"
            onClick={() => {
              addOpmlGroup({
                _text: "New Group",
                _title: "New Group",
              });
            }}
          />
          <FloatIconButton
            icon={<AddIcon />}
            label="Add Feed"
            onClick={() => setIsOpenAddOpmlListItem(true)}
          />
        </VStack>
        <AddFeedModal
          isOpen={isOpenAddOpmlListItem}
          onClose={() => setIsOpenAddOpmlListItem(false)}
        />
        <SyncBlockChainModal
          isOpen={isOpenSyncBlockChain}
          onClose={() => setIsOpenSyncBlockChain(false)}
        />
      </Box>
    </>
  );
};

export default HomePage;
