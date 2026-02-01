// Minimal ABIs — only the functions we actually call

export const identityRegistryAbi = [
  {
    type: "function",
    name: "agentCount",
    inputs: [],
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAgent",
    inputs: [{ name: "agentId", type: "uint256" }],
    outputs: [
      {
        type: "tuple",
        components: [
          { name: "owner", type: "address" },
          { name: "metadataURI", type: "string" },
          { name: "wallet", type: "address" },
          { name: "active", type: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "registerAgent",
    inputs: [
      { name: "metadataURI", type: "string" },
      { name: "wallet", type: "address" },
    ],
    outputs: [{ type: "uint256" }],
    stateMutability: "nonpayable",
  },
] as const;

export const reputationRegistryAbi = [
  {
    type: "function",
    name: "getReputation",
    inputs: [{ name: "agentId", type: "uint256" }],
    outputs: [{ type: "int256" }],
    stateMutability: "view",
  },
] as const;

export const validationRegistryAbi = [
  {
    type: "function",
    name: "isValidator",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ type: "bool" }],
    stateMutability: "view",
  },
] as const;
