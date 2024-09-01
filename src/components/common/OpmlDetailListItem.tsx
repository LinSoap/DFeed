import { Box, List, ListItem, Divider, Heading } from "@chakra-ui/react";

const OpmlDetailListItem = ({ rssItem }: { rssItem: any }) => {
  const requiredKeys = ["text"];
  //   const requiredKeys = ["text", "htmlUrl", "xmlUrl"];
  return (
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md">
      <List spacing={3}>
        <Heading>{rssItem.text}</Heading>
        {Object.keys(rssItem).map((key) => {
          if (requiredKeys.includes(key)) return;
          const value = rssItem[key];
          return (
            <ListItem
              key={key}
              p={2}
              borderWidth={1}
              borderRadius="md"
              bg="gray.100"
            >
              <strong>{key}:</strong>{" "}
              {typeof value === "object" ? JSON.stringify(value) : value}
              <Divider my={2} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default OpmlDetailListItem;
