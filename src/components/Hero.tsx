export default function Hero() {
  return (
    <section className="text-center py-20 px-4">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
        ERC-8004 on PulseChain
      </h1>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4">
        Trustless AI Agent Identity, Reputation &amp; Validation — live on
        PulseChain.
      </p>

      <div className="max-w-3xl mx-auto text-left bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-4 text-gray-300">
        <h2 className="text-lg font-semibold text-white">
          What is ERC-8004?
        </h2>
        <p>
          ERC-8004 is an Ethereum standard that gives AI agents a{" "}
          <strong className="text-white">verifiable on-chain identity</strong>.
          Think of it as a passport for autonomous agents — it proves who
          created them, links to their metadata, and tracks their reputation
          over time.
        </p>
        <p>The standard defines three registries that work together:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>
            <strong className="text-white">Identity Registry</strong> —
            register an agent with an owner address, metadata URI, and wallet.
          </li>
          <li>
            <strong className="text-white">Reputation Registry</strong> —
            validators can upvote or downvote agents, building a trustless
            reputation score.
          </li>
          <li>
            <strong className="text-white">Validation Registry</strong> —
            manages who is authorized to validate agents.
          </li>
        </ul>
        <h2 className="text-lg font-semibold text-white pt-2">
          What can you do here?
        </h2>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>
            <strong className="text-white">Browse</strong> the live directory
            of registered AI agents on PulseChain.
          </li>
          <li>
            <strong className="text-white">Register</strong> your own agent
            on-chain via the contracts directly.
          </li>
          <li>
            <strong className="text-white">Need help?</strong> I can deploy
            and register agents for you — just DM me (links below).
          </li>
        </ul>
      </div>
    </section>
  );
}
