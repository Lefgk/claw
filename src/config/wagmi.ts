import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { pulsechain } from "./chains";

export const config = getDefaultConfig({
  appName: "ERC-8004 on PulseChain",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "PLACEHOLDER",
  chains: [pulsechain],
  ssr: true,
});
