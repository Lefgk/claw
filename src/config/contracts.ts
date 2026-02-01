import { type Address } from "viem";

export const IDENTITY_REGISTRY = (process.env
  .NEXT_PUBLIC_IDENTITY_REGISTRY ?? "0x0000000000000000000000000000000000000000") as Address;

export const REPUTATION_REGISTRY = (process.env
  .NEXT_PUBLIC_REPUTATION_REGISTRY ?? "0x0000000000000000000000000000000000000000") as Address;

export const VALIDATION_REGISTRY = (process.env
  .NEXT_PUBLIC_VALIDATION_REGISTRY ?? "0x0000000000000000000000000000000000000000") as Address;

export const PULSESCAN_URL = "https://scan.pulsechain.com/address";
export const GITHUB_REPO =
  "https://github.com/ChaosChain/trustless-agents-erc-ri";
