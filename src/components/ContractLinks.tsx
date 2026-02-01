import {
  IDENTITY_REGISTRY,
  REPUTATION_REGISTRY,
  VALIDATION_REGISTRY,
  PULSESCAN_URL,
  GITHUB_REPO,
} from "@/config/contracts";

function truncate(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

const contracts = [
  { label: "Identity Registry", address: IDENTITY_REGISTRY },
  { label: "Reputation Registry", address: REPUTATION_REGISTRY },
  { label: "Validation Registry", address: VALIDATION_REGISTRY },
] as const;

export default function ContractLinks() {
  return (
    <section className="py-16 px-4">
      <h2 className="text-2xl font-bold text-white text-center mb-8">
        Deployed Contracts
      </h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {contracts.map((c) => (
          <div
            key={c.label}
            className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-3"
          >
            <h3 className="text-lg font-semibold text-violet-300">
              {c.label}
            </h3>
            <code className="text-sm text-gray-400 break-all">
              {truncate(c.address)}
            </code>
            <div className="flex gap-3 mt-auto text-sm">
              <a
                href={`${PULSESCAN_URL}/${c.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 underline underline-offset-2"
              >
                View on PulseScan
              </a>
              <a
                href={GITHUB_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 underline underline-offset-2"
              >
                View Source
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
