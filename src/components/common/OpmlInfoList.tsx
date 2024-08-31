import { Heading, List, ListItem, Box } from "@chakra-ui/react";

const OpmlInfoList = (opml: any) => {
  const header = opml.opml.opml.head;
  const body = opml.opml.opml.body;

  const renderRssItem = (item: any) => {
    return (
      <Box key={item.title}>
        <Box fontWeight="bold">{item.title}</Box>
        <Box>{item.title}</Box>
        <Box>{item.xmlUrl}</Box>
        <Box>{item.htmlUrl}</Box>
      </Box>
    );
  };

  const renderRssList = (outline: any) => {
    return Array.isArray(outline)
      ? outline.map(renderRssItem)
      : renderRssItem(outline);
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
