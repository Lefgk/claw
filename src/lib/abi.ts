// Minimal ABIs — only the functions we actually call

export const identityRegistryAbi = [
  {
    type: "function",
    name: "totalAgents",
    inputs: [],
    outputs: [{ name: "count", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "agentExists",
    inputs: [{ name: "agentId", type: "uint256" }],
    outputs: [{ name: "exists", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "ownerOf",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "tokenURI",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAgentWallet",
    inputs: [{ name: "agentId", type: "uint256" }],
    outputs: [{ name: "wallet", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "register",
    inputs: [{ name: "agentURI", type: "string" }],
    outputs: [{ name: "agentId", type: "uint256" }],
    stateMutability: "nonpayable",
  },
] as const;

export const reputationRegistryAbi = [
  {
    type: "function",
    name: "readAllFeedback",
    inputs: [{ name: "agentId", type: "uint256" }],
    outputs: [
      { name: "clients", type: "address[]" },
      { name: "values", type: "int128[]" },
      { name: "decimals", type: "uint8[]" },
    ],
    stateMutability: "view",
  },
] as const;

export const validationRegistryAbi = [
  {
    type: "function",
    name: "getAgentValidations",
    inputs: [{ name: "agentId", type: "uint256" }],
    outputs: [{ type: "bytes32[]" }],
    stateMutability: "view",
  },
] as const;
