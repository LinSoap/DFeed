import {
  AccordionItem,
  AccordionButton,
  Box,
  AccordionPanel,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { useOpml } from "../providers/OpmlProvider";
import { EditableControls } from "./EditableControls";
import { FiPlusCircle, FiXCircle } from "react-icons/fi";

const FeedItem = ({
  feed,
  itemIndex,
  groupIndex,
}: {
  feed: any;
  itemIndex: number;
  groupIndex: number;
}) => {
  const { updateOpmlListItem } = useOpml();
  return (
    <AccordionItem
      borderRadius={"16px"}
      boxShadow={"4px 4px 0px 0px black"}
      border={"2px solid"}
      marginY={"1rem"}
      backgroundColor="#f4f4f4"
      transition="box-shadow 0.2s ease-in-out"
      _hover={{
        boxShadow: "6px 6px 0px 0px black",
      }}
    >
      {({ isExpanded }) => (
        <>
          <AccordionButton paddingX={"1.25rem"} paddingY={"1.5rem"}>
            <Box as="span" flex="1" textAlign="left" fontWeight={"bold"}>
              {feed._text}
            </Box>
            {isExpanded ? <FiXCircle size={30} /> : <FiPlusCircle size={30} />}
          </AccordionButton>
          <AccordionPanel pb={4} transition="all 0.5s ease-in-out">
            <List>
              {Object.keys(feed).map((key) => {
                const value = feed[key];
                return (
                  <ListItem key={key}>
                    <HStack>
                      <Text>{key.replace("_", "")}:</Text>
                      <Editable
                        width="100%"
                        textAlign="left"
                        defaultValue={value}
                        onSubmit={(value) => {
                          updateOpmlListItem(groupIndex, itemIndex, key, value);
                        }}
                      >
                        <InputGroup>
                          <Input as={EditableInput} />
                          <EditablePreview />
                          <InputRightElement marginRight="30">
                            <EditableControls />
                          </InputRightElement>
                        </InputGroup>
                      </Editable>
                    </HStack>
                  </ListItem>
                );
              })}
            </List>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};

export default FeedItem;
