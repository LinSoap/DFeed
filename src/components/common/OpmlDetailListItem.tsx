import {
  Box,
  List,
  ListItem,
  Heading,
  HStack,
  Text,
  Editable,
  EditablePreview,
  EditableInput,
  InputGroup,
  InputRightElement,
  Input,
} from "@chakra-ui/react";
import { EditableControls } from "./EditableControls";
import { useOpml } from "../providers/OpmlProvider";

const OpmlDetailListItem = ({
  feed,
  itemIndex,
  groupIndex,
}: {
  feed: any;
  itemIndex: number;
  groupIndex: number;
}) => {
  const { updateOpmlListItem } = useOpml();
  // const requiredKeys = ["_text"];
  //   const requiredKeys = ["text", "htmlUrl", "xmlUrl"];
  return (
    <Box p={4}>
      <List spacing={3}>
        <Heading>{feed._text}</Heading>
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
    </Box>
  );
};

export default OpmlDetailListItem;
