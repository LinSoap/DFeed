import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "../../wagmi";
import Web3 from "web3";
import contractABI from "../../assets/RSSFeedStorage.json";
import { useContext } from "react";

const queryClient = new QueryClient();

const DappContext = React.createContext<any>(null);

export function DappProviders({ children }: { children: React.ReactNode }) {
  const contractAddress = "0xf5aAA19E6854413407F7A95E81B9BD3a1eC1A602";
  let web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(contractABI, contractAddress);

  const updateIPFSAddress = async (ipfsPath: string, address: string) => {
    const ipfsAddress = await contract.methods
      .updateIPFSAddress(ipfsPath)
      .send({ from: address });
    return ipfsAddress;
  };

  const getIPFSAddress = async (address: string) => {
    const ipfsAddress = await contract.methods.getIPFSAddress(address).call();
    return ipfsAddress;
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <DappContext.Provider value={{ updateIPFSAddress, getIPFSAddress }}>
            {children}
          </DappContext.Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export function useDapp() {
  return useContext(DappContext);
}
