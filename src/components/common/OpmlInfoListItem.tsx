import { useState } from "react";
import OpmlDetailListItem from "./OpmlDetailListItem";
import OpmlChiefListItem from "./OpmlChiefListItem";
import { Button } from "@chakra-ui/react";

const OpmlInfoListItem = ({
  rssItem,
  groupIndex,
}: {
  rssItem: any;
  groupIndex: number;
}) => {
  const [isChief, setIsChief] = useState(true);
  return (
    <>
      {isChief ? (
        <OpmlChiefListItem rssItem={rssItem} />
      ) : (
        <OpmlDetailListItem rssItem={rssItem} groupIndex={groupIndex} />
      )}
      <Button onClick={() => setIsChief(!isChief)}>
        {isChief ? "Detail" : "Chief"}
      </Button>
    </>
  );
};

export default OpmlInfoListItem;
