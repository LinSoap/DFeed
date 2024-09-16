import {
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  List,
  ListItem,
} from "@chakra-ui/react";
import OpmlInfoListItem from "./OpmlInfoListItem";
import { useOpml } from "../providers/OpmlProvider";
import { EditableControls } from "./EditableControls";
import StyledInput from "../styled/StyledInput";

const OpmlInfoList = (opml: any) => {
  const header = opml.opml.opml.head;
  const body = opml.opml.opml.body;
  const { updateOpmlGroupTitle } = useOpml();

  const renderRssList = (outline: any, groupIndex: number) => {
    if (!outline.outline) {
      return null;
    }
    return Array.isArray(outline.outline) ? (
      outline.outline.map((item: any, index: number) => (
        <OpmlInfoListItem
          feed={item}
          key={index}
          itemIndex={index}
          groupIndex={groupIndex}
        />
      ))
    ) : (
      <OpmlInfoListItem
        feed={outline.outline}
        itemIndex={0}
        groupIndex={groupIndex}
      />
    );
  };

  return (
    <>
      <Heading mb={4}>Rss Feed List: {header.title}</Heading>
      <List spacing={3}>
        {body.outline.map((outline: any, index: number) => (
          <ListItem key={index}>
            <Editable
              textAlign="center"
              defaultValue={outline._title}
              fontSize="2xl"
              fontWeight={"bold"}
              onSubmit={(value) => {
                updateOpmlGroupTitle(index, value);
              }}
            >
              <EditablePreview />
              <StyledInput as={EditableInput} />
              <EditableControls />
            </Editable>
            {renderRssList(outline, index)}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default OpmlInfoList;
