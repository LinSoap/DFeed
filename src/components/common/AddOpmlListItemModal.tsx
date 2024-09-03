import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  HStack,
  Button,
  Box,
  Text,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useOpml } from "../providers/OpmlProvider";

const AddOpmlListItemModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { addOpmlListItem, groups } = useOpml();
  const [selectedGroup, setSelectedGroup] = useState<number>(0);
  const [rssItem, setRssItem] = useState<{
    _text: string;
    _htmlUrl: string;
    _xmlUrl: string;
    [key: string]: any;
  }>({
    _text: "",
    _htmlUrl: "",
    _xmlUrl: "",
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Feed</ModalHeader>
        <ModalCloseButton position="absolute" right="4" top="4" />
        <ModalBody>
          <VStack spacing={2}>
            <HStack>
              <Text>Text:</Text>
              <Input
                type="text"
                value={rssItem._text}
                onChange={(e) =>
                  setRssItem({ ...rssItem, _text: e.target.value })
                }
              />
            </HStack>
            <HStack>
              <Text>htmlURL:</Text>
              <Input
                type="text"
                value={rssItem._htmlUrl}
                onChange={(e) =>
                  setRssItem({ ...rssItem, _htmlUrl: e.target.value })
                }
              />
            </HStack>
            <HStack>
              <Text>xmlUrl:</Text>
              <Input
                type="text"
                value={rssItem._xmlUrl}
                onChange={(e) =>
                  setRssItem({ ...rssItem, _xmlUrl: e.target.value })
                }
              />
            </HStack>
            <HStack>
              <Text>Group:</Text>
              <Select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(Number(e.target.value))}
              >
                {groups.map((group: string, index: number) => (
                  <option key={index} value={index}>
                    {group}
                  </option>
                ))}
              </Select>
            </HStack>
          </VStack>
          <Box
            padding="10px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button onClick={() => addOpmlListItem(rssItem, selectedGroup)}>
              Add
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddOpmlListItemModal;
