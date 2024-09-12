import StyledCard from "../styled/StyledCard";
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
      <StyledCard paddingX={"1.25rem"} paddingY={"1.5rem"} marginY={"1rem"}>
        <FeedItem feed={feed} itemIndex={itemIndex} groupIndex={groupIndex} />
      </StyledCard>
    </>
  );
};

export default OpmlInfoListItem;
