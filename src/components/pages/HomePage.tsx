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
import { useDapp } from "../providers/DappProvider";
import { useKubo } from "../providers/KuboProvider";
import { useAccount } from "wagmi";
import FloatIconButton from "../common/FloatIconButton";

const HomePage = () => {
  const { address } = useAccount();
  const { opml, uploadOpmlToIpfs, addOpmlGroup } = useOpml();
  const { opmlIpfsPath } = useKubo();
  const { updateIPFSAddress } = useDapp();
  const [isOpenAddOpmlListItem, setIsOpenAddOpmlListItem] = useState(false);

  return (
    <>
      <Box justifyContent="center" alignItems="center" paddingX={"5%"}>
        <OpmlInfoList opml={opml} />

        <VStack spacing={4} position="fixed" bottom="20px" left="20px">
          <FloatIconButton
            icon={<FaEthereum />}
            label="Sync IPFS Path to Blockchain"
            onClick={() => {
              console.log(address, opmlIpfsPath);
              updateIPFSAddress(opmlIpfsPath, address);
            }}
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
            icon={<AddIcon />}
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
      </Box>
    </>
  );
};

export default HomePage;
