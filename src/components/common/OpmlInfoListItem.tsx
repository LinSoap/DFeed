import { useState } from "react";
import OpmlDetailListItem from "./OpmlDetailListItem";
import OpmlChiefListItem from "./OpmlChiefListItem";
import { Button } from "@chakra-ui/react";

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
    </>
  );
};

export default OpmlInfoListItem;
