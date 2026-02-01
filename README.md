# ERC-8004 on PulseChain

The first deployment of [ERC-8004](https://eips.ethereum.org/EIPS/eip-8004) (Trustless AI Agent Identity, Reputation & Validation) on PulseChain.

**Live site:** [claw-kappa-three.vercel.app](https://claw-kappa-three.vercel.app)

## What is ERC-8004?

ERC-8004 is an Ethereum standard that gives AI agents a verifiable on-chain identity. It defines three registries:

- **Identity Registry** — Register an agent as an NFT with metadata and a wallet address
- **Reputation Registry** — Anyone can leave on-chain feedback (positive/negative) on agents
- **Validation Registry** — Independent third parties can verify and score agents

## Deployed Contracts (PulseChain)

| Contract | Address |
|---|---|
| IdentityRegistry | [`0xBCEF22704E9B107a488FCA260D6A2c31f8e638f0`](https://scan.pulsechain.com/address/0xBCEF22704E9B107a488FCA260D6A2c31f8e638f0) |
| ReputationRegistry | [`0x6a59AB25432489Cd26E3AeC0156C9cacf266Fa5c`](https://scan.pulsechain.com/address/0x6a59AB25432489Cd26E3AeC0156C9cacf266Fa5c) |
| ValidationRegistry | [`0x95BaDb56a0A77529447Db746e9aCB6cB21A5DD58`](https://scan.pulsechain.com/address/0x95BaDb56a0A77529447Db746e9aCB6cB21A5DD58) |

## Features

- Browse the live directory of registered AI agents (no wallet needed)
- Register your own agent by connecting a wallet on PulseChain
- View contracts on PulseScan with verified source code
- Beginner-friendly explainer of how the standard works

## Tech Stack

- **Next.js 16** (App Router) + **Tailwind CSS**
- **viem** for read-only chain reads
- **wagmi + RainbowKit** for wallet connect & agent registration
- Deployed on **Vercel**

## Getting Started

```bash
# Clone
git clone https://github.com/Lefgk/claw.git
cd claw

# Install
npm install

# Set up env vars
cp .env.local.example .env.local
# Edit .env.local with your contract addresses + WalletConnect project ID

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_IDENTITY_REGISTRY` | IdentityRegistry contract address |
| `NEXT_PUBLIC_REPUTATION_REGISTRY` | ReputationRegistry contract address |
| `NEXT_PUBLIC_VALIDATION_REGISTRY` | ValidationRegistry contract address |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect project ID ([get one here](https://cloud.walletconnect.com)) |

## Contract Source

The ERC-8004 reference implementation lives at [ChaosChain/trustless-agents-erc-ri](https://github.com/ChaosChain/trustless-agents-erc-ri).

## Contact

- Twitter/X: [@GLordskotostras](https://x.com/GLordskotostras)
- Telegram: [@Lefkk](https://t.me/Lefkk)

Want an agent registered on PulseChain? DM me — I can help.

## License

MIT
