import React, { createContext, useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { parseXML } from "../../utils/opml";

const OpmlContext = createContext<any>(null);
export function OpmlProvider({ children }: { children: React.ReactNode }) {
  const [cookies, setCookie] = useCookies(["opml"]);
  const [opml, setOpml] = useState<any>(cookies.opml || null);

  const parseOpml = async (opml: string) => {
    try {
      const parsedOpml = await parseXML(opml);
      setOpml(parsedOpml);
      setCookie("opml", parsedOpml);
    } catch (error) {
      console.error("Can't parse opml:", error);
    }
  };

  return (
    <OpmlContext.Provider value={{ opml, parseOpml }}>
      {children}
    </OpmlContext.Provider>
  );
}

export function useOpml() {
  return useContext(OpmlContext);
}
