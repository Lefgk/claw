export default function HowItWorks() {
  return (
    <section className="py-16 px-4">
      <h2 className="text-2xl font-bold text-white text-center mb-3">
        How Does It Actually Work?
      </h2>
      <p className="text-gray-400 text-center max-w-2xl mx-auto mb-10">
        No jargon. Here&apos;s what ERC-8004 does in plain English.
      </p>

      {/* The big picture */}
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Step 1 */}
        <div className="flex gap-5">
          <div className="shrink-0 w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold">
            1
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              An AI agent gets a passport (Identity)
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Right now, AI agents are anonymous. You have no idea who built
              them, who controls them, or whether you can trust them. ERC-8004
              fixes that. When you <strong className="text-white">register</strong>{" "}
              an agent, you mint an NFT on-chain. That NFT{" "}
              <em>is</em> the agent&apos;s identity — it records who created
              it, links to a description file (metadata URI), and can hold a
              wallet address the agent uses for payments. Think of it as an
              on-chain passport that anyone can verify.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex gap-5">
          <div className="shrink-0 w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold">
            2
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              People leave reviews (Reputation)
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Anyone can leave feedback on a registered agent — positive or
              negative, with a score and tags. All feedback lives on-chain so
              it can&apos;t be deleted or faked by the agent owner. Over time
              this builds a{" "}
              <strong className="text-white">trustless reputation</strong>:
              you don&apos;t need to trust a company&apos;s star rating, you
              can read the raw on-chain data yourself. It&apos;s like Google
              Reviews, but nobody can remove the bad ones.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex gap-5">
          <div className="shrink-0 w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold">
            3
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Independent experts verify it (Validation)
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Want proof that an agent actually does what it claims? The agent
              owner can request a{" "}
              <strong className="text-white">validation</strong> from an
              independent third party — a security auditor, a zkML prover, or
              a trusted enclave (TEE). The validator checks the agent and
              posts a score (0-100) on-chain. It&apos;s like getting a safety
              certificate, but transparent and verifiable by everyone.
            </p>
          </div>
        </div>

        {/* Why it matters */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
          <h3 className="text-lg font-semibold text-white mb-3">
            Why does this matter?
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-300">
            <div className="space-y-2">
              <p>
                <strong className="text-violet-300">For users:</strong> Before
                you let an AI agent manage your money, trade for you, or
                access your data, you can check its on-chain identity,
                reputation history, and validation certificates. No more blind
                trust.
              </p>
            </div>
            <div className="space-y-2">
              <p>
                <strong className="text-violet-300">For builders:</strong>{" "}
                Register your agent to build credibility. Good reviews and
                validations make your agent stand out. The identity is an NFT
                you own — you can transfer or sell it.
              </p>
            </div>
          </div>
        </div>

        {/* Simple analogy */}
        <div className="bg-gradient-to-r from-violet-900/20 to-purple-900/20 border border-violet-500/20 rounded-2xl p-6 md:p-8">
          <h3 className="text-lg font-semibold text-white mb-3">
            Think of it like this
          </h3>
          <div className="space-y-3 text-gray-300">
            <p>
              Imagine hiring a contractor. You&apos;d want to see their{" "}
              <strong className="text-white">license</strong> (identity),
              read their <strong className="text-white">reviews</strong>{" "}
              (reputation), and maybe check if they&apos;re{" "}
              <strong className="text-white">certified</strong> (validation).
            </p>
            <p>
              ERC-8004 does the same thing for AI agents — except everything is
              on the blockchain, so nobody can lie about it.
            </p>
          </div>
        </div>

        {/* FAQ-style */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">
            Common questions
          </h3>

          <details className="group bg-white/5 border border-white/10 rounded-xl">
            <summary className="px-5 py-4 cursor-pointer text-white font-medium flex items-center justify-between">
              Do I need crypto to browse agents?
              <span className="text-gray-500 group-open:rotate-45 transition-transform text-xl">+</span>
            </summary>
            <p className="px-5 pb-4 text-gray-400">
              No. The agent directory is read directly from the blockchain —
              no wallet needed. Just scroll down and browse.
            </p>
          </details>

          <details className="group bg-white/5 border border-white/10 rounded-xl">
            <summary className="px-5 py-4 cursor-pointer text-white font-medium flex items-center justify-between">
              How do I register my own agent?
              <span className="text-gray-500 group-open:rotate-45 transition-transform text-xl">+</span>
            </summary>
            <p className="px-5 pb-4 text-gray-400">
              You call the <code className="text-violet-400">register()</code>{" "}
              function on the IdentityRegistry contract with a URI pointing to
              your agent&apos;s metadata JSON. You can do this via PulseScan,
              a script, or DM me and I&apos;ll handle it for you.
            </p>
          </details>

          <details className="group bg-white/5 border border-white/10 rounded-xl">
            <summary className="px-5 py-4 cursor-pointer text-white font-medium flex items-center justify-between">
              What if I don&apos;t know how to do any of this?
              <span className="text-gray-500 group-open:rotate-45 transition-transform text-xl">+</span>
            </summary>
            <p className="px-5 pb-4 text-gray-400">
              No problem — reach out on{" "}
              <a
                href="https://x.com/GLordskotostras"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 underline underline-offset-2"
              >
                Twitter
              </a>{" "}
              or{" "}
              <a
                href="https://t.me/Lefkk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 underline underline-offset-2"
              >
                Telegram
              </a>
              . I can register and set up agents for you.
            </p>
          </details>

          <details className="group bg-white/5 border border-white/10 rounded-xl">
            <summary className="px-5 py-4 cursor-pointer text-white font-medium flex items-center justify-between">
              Is this only on PulseChain?
              <span className="text-gray-500 group-open:rotate-45 transition-transform text-xl">+</span>
            </summary>
            <p className="px-5 pb-4 text-gray-400">
              ERC-8004 is an Ethereum standard — it can be deployed on any
              EVM chain. This is the first deployment on PulseChain
              specifically. The same contracts exist on other networks too.
            </p>
          </details>

        </div>
      </div>
    </section>
  );
}
