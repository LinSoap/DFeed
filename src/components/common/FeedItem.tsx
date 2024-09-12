import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
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
    <Accordion defaultIndex={[0]} allowMultiple>
      <AccordionItem>
        <AccordionButton>
          <Box>{feed._text}</Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <List>
            {Object.keys(feed).map((key) => {
              // if (requiredKeys.includes(key)) return;
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
      </AccordionItem>
    </Accordion>
  );
};

export default FeedItem;
