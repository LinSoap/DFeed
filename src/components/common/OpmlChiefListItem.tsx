import { Box } from "@chakra-ui/react";

const OpmlChiefListItem = ({
  rssItem,
}: {
  rssItem: { _text: string; _xmlUrl: string; _htmlUrl: string };
}) => {
  return (
    <Box>
      <Box fontWeight="bold">{rssItem._text}</Box>
      <Box>{rssItem._xmlUrl}</Box>
      <Box>{rssItem._htmlUrl}</Box>
    </Box>
  );
};

export default OpmlChiefListItem;
