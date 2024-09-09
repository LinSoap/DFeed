import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  crossbell,
  localhost,
} from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "xfeed",
  projectId: 'fbd1e301b872d4a3c0bd9ce84f609e9d"',
  chains: [mainnet, polygon, optimism, arbitrum, base, crossbell, localhost],
  ssr: true,
});
