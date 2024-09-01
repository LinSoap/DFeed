import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { buildOpml, parseXML } from "../../utils/opml";

const OpmlContext = createContext<any>(null);
export function OpmlProvider({ children }: { children: React.ReactNode }) {
  const [cookies, setCookie] = useCookies(["opml"]);
  const [opml, setOpml] = useState<any>(cookies.opml || null);
  const [categories, setCategories] = useState([]);

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

  return (
    <OpmlContext.Provider
      value={{ opml, parseOpml, addOpmlListItem, categories }}
    >
      {children}
    </OpmlContext.Provider>
  );
}

export function useOpml() {
  return useContext(OpmlContext);
}
