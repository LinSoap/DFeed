import React, { createContext, useContext, useState, useEffect } from "react";
import { create, KuboRPCClient } from "kubo-rpc-client";
import { useCookies } from "react-cookie";

const KuboContext = createContext<any>(null);
export function KuboProvider({ children }: { children: React.ReactNode }) {
  const [cookies, setCookie] = useCookies(["gatewayUrl", "opmlIpfsPath"]);
  const [gatewayUrl, setGatewayUrl] = useState(
    cookies.gatewayUrl || "http://localhost:5001"
  );
  const [opmlIpfsPath, setOpmlIpfsPath] = useState<string | null>(
    cookies.opmlIpfsPath || null
  );
  const [kuboClient, setKuboClient] = useState<KuboRPCClient | null>(null);
  const [isConnectedKubo, setIsConnectedKubo] = useState(false);

  const connectKubo = async (url: string) => {
    try {
      const client = create({ url });
      await client.id();
      setGatewayUrl(url);
      setKuboClient(client);
      setIsConnectedKubo(true);
      setCookie("gatewayUrl", url);
    } catch (error) {
      console.error("Can't connect to Kubo gateway:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (opmlIpfsPath) {
      setCookie("opmlIpfsPath", opmlIpfsPath);
    }
  }, [opmlIpfsPath]);

  useEffect(() => {
    connectKubo(gatewayUrl);
  }, []);

  return (
    <KuboContext.Provider
      value={{
        gatewayUrl,
        kuboClient,
        connectKubo,
        isConnectedKubo,
        opmlIpfsPath,
        setOpmlIpfsPath,
      }}
    >
      {children}
    </KuboContext.Provider>
  );
}

export function useKubo() {
  return useContext(KuboContext);
}
