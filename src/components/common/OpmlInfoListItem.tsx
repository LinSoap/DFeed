import { Accordion } from "@chakra-ui/react";
import FeedItem from "./FeedItem";

const OpmlInfoListItem = ({
  feed,
  itemIndex,
  groupIndex,
}: {
  feed: any;
  itemIndex: number;
  groupIndex: number;
}) => {
  return (
    <>
      <Accordion allowMultiple>
        <FeedItem feed={feed} itemIndex={itemIndex} groupIndex={groupIndex} />
      </Accordion>
    </>
  );
};

export default OpmlInfoListItem;
