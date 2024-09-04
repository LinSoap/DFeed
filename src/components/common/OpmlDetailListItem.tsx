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
  rssItem,
  itemIndex,
  groupIndex,
}: {
  rssItem: any;
  itemIndex: number;
  groupIndex: number;
}) => {
  const { updateOpmlListItem } = useOpml();
  // const requiredKeys = ["_text"];
  //   const requiredKeys = ["text", "htmlUrl", "xmlUrl"];
  return (
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md">
      <List spacing={3}>
        <Heading>{rssItem.text}</Heading>
        {Object.keys(rssItem).map((key, index) => {
          // if (requiredKeys.includes(key)) return;
          const value = rssItem[key];
          return (
            <ListItem
              key={key}
              p={2}
              borderWidth={1}
              borderRadius="md"
              bg="gray.100"
            >
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
