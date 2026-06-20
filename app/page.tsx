import Link from 'next/link';
import { FiArrowRight, FiShield, FiTruck, FiGlobe, FiAnchor, FiCheckCircle } from 'react-icons/fi';

const features = [
  {
    icon: FiShield,
    title: 'Trustless Escrows',
    description: 'Secure buyer payments on-chain, automatically releasing funds to suppliers when shipping milestones are verified.',
  },
  {
    icon: FiAnchor,
    title: 'Multi-Role Lifecycle',
    description: 'Seamlessly coordinate Buyers, Suppliers, Logistics Carriers, and Inspectors within a unified state machine.',
  },
  {
    icon: FiGlobe,
    title: 'Global Route Tracking',
    description: 'Track milestones from point of origin to final delivery, with automated checks and cryptographic receipts.',
  },
];

export default function LandingPage() {
  return (
    <div className="animate-fade-in space-y-16 py-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-900 bg-slate-950/40 px-6 py-20 text-center backdrop-blur-md sm:px-12 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent" />
        <div className="absolute -top-12 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[80px]" />
        
        <div className="relative mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-950/30 px-4 py-1.5 text-xs font-semibold text-cyan-400">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            Soroban Powered Trade Escrows
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Decentralized Logistics &{' '}
            <span className="gradient-text">Milestone Escrows</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Remove counterparty risks in global trade. Coordinate buyers, sellers, carriers, and inspectors trustlessly through Stellar smart contracts.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/dashboard" className="btn-primary h-12 px-6">
              Access Trade Dashboard <FiArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/transfer" className="btn-secondary h-12 px-6">
              Direct XLM Transfer
            </Link>
          </div>
        </div>
      </section>

      {/* Global Pipeline Tracker (Visual redone elements) */}
      <section className="mx-auto max-w-5xl rounded-2xl border border-slate-900 bg-slate-950/60 p-8 shadow-xl shadow-cyan-950/5">
        <div className="mb-6 flex items-center justify-between border-b border-slate-900 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FiTruck className="text-cyan-400" />
              Global Pipeline Console
            </h3>
            <p className="text-xs text-slate-500">Live simulated shipment tracking pipeline</p>
          </div>
          <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
            Escrow Status: ACTIVE
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="relative rounded-xl border border-cyan-500/20 bg-cyan-950/10 p-4">
            <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Milestone 01</div>
            <div className="text-sm font-semibold text-white mt-1">Order Funded</div>
            <div className="text-xs text-slate-400 mt-2">Locked in Escrow</div>
            <div className="absolute right-3 top-3"><FiCheckCircle className="text-cyan-400 h-4 w-4" /></div>
          </div>

          <div className="relative rounded-xl border border-cyan-500/20 bg-cyan-950/10 p-4">
            <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Milestone 02</div>
            <div className="text-sm font-semibold text-white mt-1">Cargo Shipped</div>
            <div className="text-xs text-slate-400 mt-2">Carrier: Singapore Port</div>
            <div className="absolute right-3 top-3"><FiCheckCircle className="text-cyan-400 h-4 w-4" /></div>
          </div>

          <div className="relative rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Milestone 03</div>
            <div className="text-sm font-semibold text-white mt-1">Inspection Clear</div>
            <div className="text-xs text-slate-400 mt-2">Awaiting Inspector</div>
            <div className="absolute right-3 top-3"><span className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse block" /></div>
          </div>

          <div className="relative rounded-xl border border-slate-900 bg-slate-950/20 p-4 opacity-50">
            <div className="text-xs text-slate-600 font-bold uppercase tracking-wider">Milestone 04</div>
            <div className="text-sm font-semibold text-slate-400 mt-1">Payment Released</div>
            <div className="text-xs text-slate-600 mt-2">Triggered on delivery</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Decentralized Trade Architecture</h2>
          <p className="mt-2 text-sm text-slate-400">Core structural mechanics of the ChainTrace protocol</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="card-interactive">
              <feature.icon className="mb-4 h-6 w-6 text-cyan-400" />
              <h3 className="text-base font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
