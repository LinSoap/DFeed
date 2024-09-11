import { useState } from "react";
import OpmlDetailListItem from "./OpmlDetailListItem";
import OpmlChiefListItem from "./OpmlChiefListItem";
import { Button } from "@chakra-ui/react";
import StyledCard from "../styled/StyledCard";

const OpmlInfoListItem = ({
  feed,
  itemIndex,
  groupIndex,
}: {
  feed: any;
  itemIndex: number;
  groupIndex: number;
}) => {
  const [isChief, setIsChief] = useState(true);
  return (
    <>
      <StyledCard paddingX={"1.25rem"} paddingY={"1.5rem"} marginY={"1rem"}>
        {isChief ? (
          <OpmlChiefListItem feed={feed} />
        ) : (
          <OpmlDetailListItem
            feed={feed}
            itemIndex={itemIndex}
            groupIndex={groupIndex}
          />
        )}
        <Button onClick={() => setIsChief(!isChief)}>
          {isChief ? "Detail" : "Chief"}
        </Button>
      </StyledCard>
    </>
  );
};

export default OpmlInfoListItem;
