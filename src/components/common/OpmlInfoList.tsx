import {
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  Input,
  List,
  ListItem,
} from "@chakra-ui/react";
import OpmlInfoListItem from "./OpmlInfoListItem";
import { useOpml } from "../providers/OpmlProvider";
import { EditableControls } from "./EditableControls";

const OpmlInfoList = (opml: any) => {
  const header = opml.opml.opml.head;
  const body = opml.opml.opml.body;
  const { updateOpmlGroupTitle } = useOpml();

  const renderRssList = (outline: any) => {
    if (!outline.outline) {
      return null;
    }
    return Array.isArray(outline.outline) ? (
      outline.outline.map((item: any, index: number) => (
        <OpmlInfoListItem rssItem={item} key={index} groupIndex={index} />
      ))
    ) : (
      <OpmlInfoListItem rssItem={outline.outline} groupIndex={0} />
    );
  };

  return (
    <>
      <Heading mb={4}>Rss Feed List: {header.title}</Heading>
      <List spacing={3}>
        {body.outline.map((outline: any, index: number) => (
          <ListItem
            key={index}
            p={2}
            borderWidth={1}
            borderRadius="md"
            boxShadow="md"
          >
            <Editable
              textAlign="center"
              defaultValue={outline._title}
              fontSize="2xl"
              onSubmit={(value) => {
                updateOpmlGroupTitle(index, value);
              }}
            >
              <EditablePreview />
              <Input as={EditableInput} />
              <EditableControls />
            </Editable>
            {renderRssList(outline)}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default OpmlInfoList;
