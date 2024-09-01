import { useState } from "react";
import OpmlDetailListItem from "./OpmlDetailListItem";
import OpmlChiefListItem from "./OpmlChiefListItem";
import { Button } from "@chakra-ui/react";

const OpmlInfoListItem = ({ rssItem }: { rssItem: any }) => {
  const [isChief, setIsChief] = useState(true);
  return (
    <>
      {isChief ? (
        <OpmlChiefListItem rssItem={rssItem} />
      ) : (
        <OpmlDetailListItem rssItem={rssItem} />
      )}
      <Button onClick={() => setIsChief(!isChief)}>
        {isChief ? "Detail" : "Chief"}
      </Button>
    </>
  );
};

export default OpmlInfoListItem;
