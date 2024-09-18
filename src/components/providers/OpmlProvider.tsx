import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { buildOpml, parseXML } from "../../utils/opml";
import { useKubo } from "./KuboProvider";
import { useAlert } from "./AlertProvider";

const OpmlContext = createContext<any>(null);
export function OpmlProvider({ children }: { children: React.ReactNode }) {
  const [cookies, setCookie] = useCookies(["opml"]);
  const [opml, setOpml] = useState<any>(cookies.opml || null);
  const [groups, setGroups] = useState([]);
  const { kuboClient, setOpmlIpfsPath } = useKubo();
  const { addAlert } = useAlert();

  // console.log(opml.opml.body.outline);

  useEffect(() => {
    if (opml) {
      setGroups(opml.opml.body.outline.map((group: any) => group._title));
    }
  }, [opml]);

  const parseOpml = async (opml: string) => {
    try {
      const parsedOpml = await parseXML(opml);
      setOpml(parsedOpml);
      setCookie("opml", parsedOpml);
    } catch (error) {
      console.error("Can't parse opml:", error);
    }
  };

  const addFeed = (item: any, category: number) => {
    setOpml((prevOpml: any) => {
      const updatedOpml = { ...prevOpml };
      updatedOpml.opml.body.outline[category].outline = [
        ...(Array.isArray(updatedOpml.opml.body.outline[category].outline)
          ? updatedOpml.opml.body.outline[category].outline
          : []),
        item,
      ];
      return updatedOpml;
    });
  };

  const deleteFeed = (category: number, itemIndex: number) => {
    setOpml((prevOpml: any) => {
      const updatedOpml = { ...prevOpml };
      const outline = updatedOpml.opml.body.outline[category].outline;

      if (!Array.isArray(outline)) {
        updatedOpml.opml.body.outline[category].outline = [];
      }

      updatedOpml.opml.body.outline[category].outline.splice(itemIndex, 1);
      return updatedOpml;
    });
  };

  const addOpmlGroup = (newGroup: any) => {
    // setGroups([...groups, newGroup]);
    setOpml((prevOpml: any) => {
      const updatedOpml = { ...prevOpml };
      console.log(updatedOpml);
      updatedOpml.opml.body.outline.push(newGroup);
      console.log(updatedOpml);
      return updatedOpml;
    });
  };

  const deleteOpmlGroup = (groupIndex: number) => {
    setOpml((prevOpml: any) => {
      const updatedOpml = { ...prevOpml };
      if (Array.isArray(updatedOpml.opml.body.outline)) {
        updatedOpml.opml.body.outline.splice(groupIndex, 1);
      }
      return updatedOpml;
    });
  };

  const updateOpmlGroupTitle = (index: number, newTitle: string) => {
    setOpml((prevOpml: any) => {
      const updatedOpml = { ...prevOpml };
      updatedOpml.opml.body.outline[index]._title = newTitle;
      updatedOpml.opml.body.outline[index]._text = newTitle;
      console.log(updatedOpml);
      return updatedOpml;
    });
  };

  const updateOpmlListItem = (
    groupIndex: number,
    itemIndex: number,
    prop: string,
    newValue: string
  ) => {
    setOpml((prevOpml: any) => {
      const updatedOpml = { ...prevOpml };
      updatedOpml.opml.body.outline[groupIndex].outline[itemIndex][prop] =
        newValue;
      return updatedOpml;
    });
  };

  const deleteOpmlListItemProp = (
    groupIndex: number,
    itemIndex: number,
    prop: string
  ) => {
    setOpml((prevOpml: any) => {
      const updatedOpml = { ...prevOpml };
      if (updatedOpml.opml.body.outline[groupIndex]?.outline[itemIndex]) {
        const { [prop]: deletedProp, ...rest } =
          updatedOpml.opml.body.outline[groupIndex].outline[itemIndex];
        updatedOpml.opml.body.outline[groupIndex].outline[itemIndex] = rest;
      }
      return updatedOpml;
    });
  };

  const uploadOpmlToIpfs = async () => {
    try {
      const xml = buildOpml(opml);
      const res = await kuboClient?.add(xml);
      setOpmlIpfsPath(res.path);
      setCookie("opml", opml);
      addAlert(`OPML uploaded to IPFS`, "success");
    } catch (error) {
      console.error("Can't upload OPML to IPFS:", error);
      addAlert("Can't upload OPML to IPFS", "error");
    }
  };

  return (
    <OpmlContext.Provider
      value={{
        opml,
        parseOpml,
        addFeed,
        groups,
        addOpmlGroup,
        deleteOpmlGroup,
        updateOpmlGroupTitle,
        updateOpmlListItem,
        deleteOpmlListItemProp,
        uploadOpmlToIpfs,
        deleteFeed,
      }}
    >
      {children}
    </OpmlContext.Provider>
  );
}

export function useOpml() {
  return useContext(OpmlContext);
}
