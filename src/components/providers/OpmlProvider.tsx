import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { buildOpml, parseXML } from "../../utils/opml";
import { useKubo } from "./KuboProvider";
import { useAlert } from "./AlertProvider";

const OpmlContext = createContext<any>(null);
export function OpmlProvider({ children }: { children: React.ReactNode }) {
  const [cookies, setCookie] = useCookies(["opml"]);
  const [opml, setOpml] = useState<any>(cookies.opml || null);
  const [categories, setCategories] = useState([]);
  const { kuboClient, setOpmlIpfsPath } = useKubo();
  const { addAlert } = useAlert();

  // console.log(opml.opml.body.outline);

  useEffect(() => {
    if (opml) {
      setCategories(
        opml.opml.body.outline.map((category: any) => category._title)
      );
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

  const addOpmlListItem = (item: any, category: number) => {
    setOpml((prevOpml: any) => {
      const updatedOpml = { ...prevOpml };
      updatedOpml.opml.body.outline[category].outline = [
        ...(Array.isArray(updatedOpml.opml.body.outline[category].outline)
          ? updatedOpml.opml.body.outline[category].outline
          : []),
        item,
      ];
      console.log(updatedOpml);
      const xml = buildOpml(updatedOpml);
      console.log(xml);
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
      value={{ opml, parseOpml, addOpmlListItem, categories, uploadOpmlToIpfs }}
    >
      {children}
    </OpmlContext.Provider>
  );
}

export function useOpml() {
  return useContext(OpmlContext);
}
