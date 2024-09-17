import {
  AccordionItem,
  AccordionButton,
  Box,
  AccordionPanel,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Text,
  useTheme,
  VStack,
} from "@chakra-ui/react";
import { useOpml } from "../providers/OpmlProvider";
import { EditableControls } from "./EditableControls";
import { IoCloseCircleOutline, IoAddCircleOutline } from "react-icons/io5";
import StyledInput from "../styled/StyledInput";
import StyledButton from "../styled/StyledButton";

const FeedItem = ({
  feed,
  itemIndex,
  groupIndex,
}: {
  feed: any;
  itemIndex: number;
  groupIndex: number;
}) => {
  const { updateOpmlListItem, deleteFeed } = useOpml();
  const theme = useTheme();
  return (
    <AccordionItem
      borderRadius={"16px"}
      boxShadow={"4px 4px 0px 0px black"}
      border={"2px solid"}
      marginY={"1rem"}
      backgroundColor={theme.colors.custom.themeColor["gray"]}
      transition="box-shadow 0.2s ease-in-out"
      _hover={{
        boxShadow: "6px 6px 0px 0px black",
      }}
    >
      {({ isExpanded }) => (
        <>
          <AccordionButton paddingX={"1.25rem"} paddingY={"1rem"}>
            <Box as="span" flex="1" textAlign="left" fontWeight={"bold"}>
              {feed._text}
            </Box>
            {isExpanded ? (
              <IoAddCircleOutline size={"30px"} />
            ) : (
              <IoCloseCircleOutline size={"30px"} />
            )}
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
                          <StyledInput as={EditableInput} />
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
            <VStack justify={"center"} paddingTop={"1rem"}>
              <StyledButton
                color={"red"}
                onClick={() => deleteFeed(groupIndex, itemIndex)}
              >
                Remove
              </StyledButton>{" "}
            </VStack>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};

export default FeedItem;
