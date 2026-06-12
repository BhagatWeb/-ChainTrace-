import Link from 'next/link';
import { FiArrowRight, FiShield, FiTruck, FiLayers, FiCreditCard } from 'react-icons/fi';

const features = [
  {
    icon: FiShield,
    title: 'Trustless Escrows',
    description: 'Lock payments in secure contracts that release funds dynamically as milestones are verified.',
  },
  {
    icon: FiTruck,
    title: 'Inspector & Logistics Integration',
    description: 'Logistics tracking feeds directly into inspector triggers, automating delivery sign-offs.',
  },
  {
    icon: FiLayers,
    title: 'Multisig Oversight',
    description: 'Disputes and inspection results resolved transparently via pre-defined rules on-chain.',
  },
];

export default function LandingPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-900 bg-zinc-950">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-white/5 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 text-sm text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              Level 1 — White Belt Complete Setup
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Decentralized Trade &{' '}
              <span className="gradient-text">Supply Chain Tracking</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-zinc-400 sm:text-xl">
              Coordinate buyers, suppliers, inspectors, and logistics trustlessly. Manage payments
              safely on-chain with milestone-based escrows.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/transfer" className="btn-primary h-12 px-6">
                Direct XLM Payments <FiArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
          Core Pillars of ChainTrace
        </h2>
        <p className="mt-3 text-center text-zinc-400">
          Transforming global logistics and finance with Stellar Soroban.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="card">
              <feature.icon className="mb-3 h-6 w-6 text-zinc-300" />
              <h3 className="text-base font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Level 1 Tasks overview */}
      <section className="border-t border-zinc-900 bg-zinc-900/10">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-8">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FiCreditCard className="h-5 w-5 text-emerald-400" />
              Stellar White Belt Requirements
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              Verify your setup by connecting a wallet, checking your testnet XLM balance, and initiating a direct payment:
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3 text-center">
              <div className="rounded-lg border border-zinc-850 p-4 bg-zinc-900/20">
                <div className="text-2xl font-bold text-white">1</div>
                <div className="text-xs text-zinc-500 mt-1 font-medium">Freighter Wallet Connect</div>
              </div>
              <div className="rounded-lg border border-zinc-850 p-4 bg-zinc-900/20">
                <div className="text-2xl font-bold text-white">2</div>
                <div className="text-xs text-zinc-500 mt-1 font-medium">XLM Balance Displayed</div>
              </div>
              <div className="rounded-lg border border-zinc-850 p-4 bg-zinc-900/20">
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-xs text-zinc-500 mt-1 font-medium">Testnet Payment & Hash</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
