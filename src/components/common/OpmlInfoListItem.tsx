import { useState } from "react";
import OpmlDetailListItem from "./OpmlDetailListItem";
import OpmlChiefListItem from "./OpmlChiefListItem";
import { Button } from "@chakra-ui/react";

const OpmlInfoListItem = ({
  rssItem,
  itemIndex,
  groupIndex,
}: {
  rssItem: any;
  itemIndex: number;
  groupIndex: number;
}) => {
  const [isChief, setIsChief] = useState(true);
  return (
    <>
      {isChief ? (
        <OpmlChiefListItem rssItem={rssItem} />
      ) : (
        <OpmlDetailListItem
          rssItem={rssItem}
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
