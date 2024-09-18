import { List, ListItem } from "@chakra-ui/react";
import OpmlInfoListItem from "./OpmlInfoListItem";
import EditableText from "./TitleEditable";

const OpmlInfoList = (opml: any) => {
  // const header = opml.opml.opml.head;
  const body = opml.opml.opml.body;

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
      <List spacing={3}>
        {body.outline.map((outline: any, index: number) => (
          <ListItem key={index}>
            <EditableText index={index} defaultValue={outline._title} />
            {renderRssList(outline, index)}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default OpmlInfoList;
