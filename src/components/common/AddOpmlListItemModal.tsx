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
  const { addOpmlListItem, categories } = useOpml();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [rssItem, setRssItem] = useState<{
    text: string;
    htmlUrl: string;
    xmlUrl: string;
    [key: string]: any;
  }>({
    text: "",
    htmlUrl: "",
    xmlUrl: "",
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
                value={rssItem.text}
                onChange={(e) =>
                  setRssItem({ ...rssItem, text: e.target.value })
                }
              />
            </HStack>
            <HStack>
              <Text>htmlURL:</Text>
              <Input
                type="text"
                value={rssItem.htmlUrl}
                onChange={(e) =>
                  setRssItem({ ...rssItem, htmlUrl: e.target.value })
                }
              />
            </HStack>
            <HStack>
              <Text>xmlUrl:</Text>
              <Input
                type="text"
                value={rssItem.xmlUrl}
                onChange={(e) =>
                  setRssItem({ ...rssItem, xmlUrl: e.target.value })
                }
              />
            </HStack>
            <HStack>
              <Text>Category:</Text>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(Number(e.target.value))}
              >
                {categories.map((category: string, index: number) => (
                  <option key={index} value={index}>
                    {category}
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
            <Button onClick={() => addOpmlListItem(rssItem, selectedCategory)}>
              Add
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddOpmlListItemModal;
