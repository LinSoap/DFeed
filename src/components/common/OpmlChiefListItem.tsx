import { Box } from "@chakra-ui/react";

const OpmlChiefListItem = ({
  feed,
}: {
  feed: { _text: string; _xmlUrl: string; _htmlUrl: string };
}) => {
  return (
    <Box>
      <Box fontWeight="bold">{feed._text}</Box>
      <Box>{feed._xmlUrl}</Box>
      <Box>{feed._htmlUrl}</Box>
    </Box>
  );
};

export default OpmlChiefListItem;
