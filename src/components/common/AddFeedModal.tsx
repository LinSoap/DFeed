import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Text,
  Select,
  VStack,
  useTheme,
} from "@chakra-ui/react";
import { useState } from "react";
import { useOpml } from "../providers/OpmlProvider";
import StyledInput from "../styled/StyledInput";
import StyledButton from "../styled/StyledButton";

const AddFeedModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { addFeed, groups } = useOpml();
  const [selectedGroup, setSelectedGroup] = useState<number>(0);
  const [feed, setFeed] = useState<{
    _text: string;
    _title: string;
    _type: string;
    _htmlUrl: string;
    _xmlUrl: string;
    [key: string]: any;
  }>({
    _text: "",
    _title: "",
    _type: "rss",
    _htmlUrl: "",
    _xmlUrl: "",
  });

  const theme = useTheme();

  const handleAddFeed = () => {
    const feedToAdd: Partial<typeof feed> = {
      _text: feed._text,
      _xmlUrl: feed._xmlUrl,
    };

    if (feed._title) feedToAdd._title = feed._title;
    if (feed._type) feedToAdd._type = feed._type;
    if (feed._htmlUrl) feedToAdd._htmlUrl = feed._htmlUrl;

    addFeed(feedToAdd, selectedGroup);
    onClose();
  };

  const isButtonDisabled = feed._text.length === 0 || feed._xmlUrl.length === 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent
        borderRadius={"16px"}
        boxShadow={"4px 4px 0px 0px black"}
        border={"2px solid"}
        backgroundColor={theme.colors.custom.themeColor["gray"]}
      >
        <ModalHeader fontFamily={"Poppins"}>Add Feed</ModalHeader>
        <ModalCloseButton position="absolute" right="4" top="4" />
        <ModalBody>
          <VStack spacing={2} paddingX={"1rem"}>
            <VStack width={"full"} align={"start"}>
              <Text fontFamily={"Poppins"} fontWeight={"bold"}>
                Text*:
              </Text>
              <StyledInput
                width={"100%"}
                type="text"
                value={feed._text}
                isRequired={true}
                onChange={(e) => setFeed({ ...feed, _text: e.target.value })}
              />
            </VStack>
            <VStack width={"full"} align={"start"}>
              <Text fontFamily={"Poppins"} fontWeight={"bold"}>
                xmlUrl*:
              </Text>
              <StyledInput
                type="text"
                value={feed._xmlUrl}
                onChange={(e) => setFeed({ ...feed, _xmlUrl: e.target.value })}
              />
            </VStack>
            <VStack width={"full"} align={"start"}>
              <Text fontFamily={"Poppins"} fontWeight={"bold"}>
                Title:
              </Text>
              <StyledInput
                width={"100%"}
                type="text"
                value={feed._title}
                onChange={(e) => setFeed({ ...feed, _title: e.target.value })}
              />
            </VStack>
            <VStack width={"full"} align={"start"}>
              <Text fontFamily={"Poppins"} fontWeight={"bold"}>
                htmlURL:
              </Text>
              <StyledInput
                type="text"
                value={feed._htmlUrl}
                onChange={(e) => setFeed({ ...feed, _htmlUrl: e.target.value })}
              />
            </VStack>
            <VStack width={"full"} align={"start"}>
              <Text fontFamily={"Poppins"} fontWeight={"bold"}>
                Type:
              </Text>
              <StyledInput
                type="text"
                value={feed._type}
                onChange={(e) => setFeed({ ...feed, _type: e.target.value })}
              />
            </VStack>

            <VStack width={"full"} align={"start"}>
              <Text fontFamily={"Poppins"} fontWeight={"bold"}>
                Group:
              </Text>
              <Select
                value={selectedGroup}
                colorScheme="blackAlpha"
                border={"2px solid"}
                focusBorderColor={theme.colors.custom.themeColor["red"]}
                _hover={{ borderColor: theme.colors.custom.themeColor["red"] }}
                onChange={(e) => setSelectedGroup(Number(e.target.value))}
              >
                {groups.map((group: string, index: number) => (
                  <option key={index} value={index}>
                    {group}
                  </option>
                ))}
              </Select>
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
              onClick={handleAddFeed}
              isDisabled={isButtonDisabled}
            >
              Add
            </StyledButton>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddFeedModal;
