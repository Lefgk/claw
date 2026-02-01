import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";
import ContractLinks from "@/components/ContractLinks";
import AgentDirectory from "@/components/AgentDirectory";
import CallToAction from "@/components/CallToAction";
import { GITHUB_REPO } from "@/config/contracts";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-6xl mx-auto w-full">
        <Hero />
        <HowItWorks />
        <UseCases />
        <ContractLinks />
        <AgentDirectory />
        <CallToAction />
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-500 space-y-2">
        <p>
          <a
            href="https://eips.ethereum.org/EIPS/eip-8004"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 hover:text-violet-300 underline underline-offset-2"
          >
            ERC-8004
          </a>{" "}
          &middot;{" "}
          <a
            href="https://pulsechain.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            PulseChain
          </a>{" "}
          &middot;{" "}
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
