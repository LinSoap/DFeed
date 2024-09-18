import { Heading, List, ListItem } from "@chakra-ui/react";
import OpmlInfoListItem from "./OpmlInfoListItem";
import { useOpml } from "../providers/OpmlProvider";
import EditableText from "./TitleEditable";

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
            <EditableText
              index={index}
              defaultValue={outline._title}
              updateOpmlGroupTitle={updateOpmlGroupTitle}
              onDelete={() => console.log("delete")}
            ></EditableText>
            {renderRssList(outline, index)}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default OpmlInfoList;
