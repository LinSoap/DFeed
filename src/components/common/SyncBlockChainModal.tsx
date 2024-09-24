import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useTheme,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useDapp } from "../providers/DappProvider";
import StyledButton from "../styled/StyledButton";
import { useKubo } from "../providers/KuboProvider";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

const SyncBlockChainModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { address, isConnected } = useAccount();
  const { getIPFSAddress, updateIPFSAddress } = useDapp();
  const [blockChainIpfsPath, setBlockChainIpfsPath] = useState(null);
  const { opmlIpfsPath } = useKubo();
  const theme = useTheme();

  useEffect(() => {
    if (isConnected) {
      handleGetIPFSAddressFromBlockchain();
    }
  }, []);

  const handleGetIPFSAddressFromBlockchain = async () => {
    const ipfsAddress = await getIPFSAddress(address);
    if (ipfsAddress.length > 0) {
      setBlockChainIpfsPath(ipfsAddress);
    }
  };

  return (
    <Modal size={"lg"} isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent
        borderRadius={"16px"}
        boxShadow={"4px 4px 0px 0px black"}
        border={"2px solid"}
        backgroundColor={theme.colors.custom.themeColor["gray"]}
      >
        <ModalHeader fontFamily={"Poppins"}>Check Info</ModalHeader>
        <ModalCloseButton position="absolute" right="4" top="4" />
        <ModalBody>
          <VStack>
            <VStack width={"full"} align={"center"}>
              <Text fontFamily={"Poppins"} fontWeight={"bold"}>
                BlockChain IPFS Path
              </Text>

              <Text fontFamily={"Poppins"} fontSize={"14px"}>
                {blockChainIpfsPath}
              </Text>
            </VStack>
            <VStack width={"full"} align={"center"}>
              <Text fontFamily={"Poppins"} fontWeight={"bold"}>
                Current IPFS Path
              </Text>

              <Text fontFamily={"Poppins"} fontSize={"14px"}>
                {opmlIpfsPath}
              </Text>
            </VStack>
          </VStack>
          <Box
            padding="10px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <StyledButton
              color={"red"}
              marginTop={"1rem"}
              onClick={async () => {
                await updateIPFSAddress(opmlIpfsPath, address);
                await handleGetIPFSAddressFromBlockchain();
              }}
              isDisabled={blockChainIpfsPath === opmlIpfsPath}
            >
              Confirm
            </StyledButton>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SyncBlockChainModal;
