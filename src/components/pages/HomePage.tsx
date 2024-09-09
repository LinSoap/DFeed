import { useOpml } from "../providers/OpmlProvider";
import OpmlInfoList from "../common/OpmlInfoList";
import { Box, IconButton, Tooltip, VStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { BiExport } from "react-icons/bi";
import { SiIpfs } from "react-icons/si";
import { useState } from "react";
import { downloadFile } from "../../utils/file";
import { buildOpml } from "../../utils/opml";
import AddFeedModal from "../common/AddFeedModal";
import { FaEthereum } from "react-icons/fa";
import { useDapp } from "../providers/DappProvider";
import { useKubo } from "../providers/KuboProvider";
import { useAccount } from "wagmi";

const HomePage = () => {
  const { address } = useAccount();
  const { opml, uploadOpmlToIpfs, addOpmlGroup } = useOpml();
  const { opmlIpfsPath } = useKubo();
  const { updateIPFSAddress } = useDapp();
  const [isOpenAddOpmlListItem, setIsOpenAddOpmlListItem] = useState(false);

  return (
    <>
      <Box justifyContent="center" alignItems="center">
        <OpmlInfoList opml={opml} />

        <VStack spacing={4} position="fixed" bottom="20px" left="20px">
          <Tooltip label="Sync IPFS Path to Blockchain">
            <IconButton
              icon={<FaEthereum />}
              aria-label="Sync IPFS Path to Blockchain"
              zIndex="1000"
              onClick={() => {
                console.log(address, opmlIpfsPath);
                updateIPFSAddress(opmlIpfsPath, address);
              }}
            />
          </Tooltip>
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
                  _text: "New Group",
                  _title: "New Group",
                })
              }
            />
          </Tooltip>
          <Tooltip label="Add Feed">
            <IconButton
              icon={<AddIcon />}
              aria-label="Add Feed"
              zIndex="1000"
              onClick={() => setIsOpenAddOpmlListItem(true)}
            />
          </Tooltip>
        </VStack>
        <AddFeedModal
          isOpen={isOpenAddOpmlListItem}
          onClose={() => setIsOpenAddOpmlListItem(false)}
        />
      </Box>
    </>
  );
};

export default HomePage;
