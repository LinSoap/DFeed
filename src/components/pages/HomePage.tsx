import { useOpml } from "../providers/OpmlProvider";
import OpmlInfoList from "../common/OpmlInfoList";

const HomePage = () => {
  const { opml } = useOpml();

  return (
    <>
      <OpmlInfoList opml={opml} />
    </>
  );
};

export default HomePage;
