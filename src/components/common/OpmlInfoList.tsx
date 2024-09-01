import { Heading, List, ListItem } from "@chakra-ui/react";
import OpmlInfoListItem from "./OpmlInfoListItem";

const OpmlInfoList = (opml: any) => {
  const header = opml.opml.opml.head;
  const body = opml.opml.opml.body;

  const renderRssList = (outline: any) => {
    return Array.isArray(outline) ? (
      outline.map((item: any, index: number) => (
        <OpmlInfoListItem rssItem={item} key={index} />
      ))
    ) : (
      <OpmlInfoListItem rssItem={outline} />
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
            {renderRssList(outline.outline)}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default OpmlInfoList;
