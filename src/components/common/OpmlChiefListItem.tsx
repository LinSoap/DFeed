import { Box } from "@chakra-ui/react";

const OpmlChiefListItem = ({
  rssItem,
}: {
  rssItem: { text: string; xmlUrl: string; htmlUrl: string };
}) => {
  return (
    <Box>
      <Box fontWeight="bold">{rssItem.text}</Box>
      <Box>{rssItem.xmlUrl}</Box>
      <Box>{rssItem.htmlUrl}</Box>
    </Box>
  );
};

export default OpmlChiefListItem;
