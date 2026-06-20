import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="animate-fade-in space-y-16 py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center gap-8 py-8 lg:py-16">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center px-3 py-1 bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold rounded-full tracking-wider uppercase">
              Soroban Powered Trade Escrows
            </div>
            <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight">
              Decentralized Logistics &amp; Milestone Escrows
            </h1>
            <p className="text-lg text-slate-500 max-w-xl leading-relaxed">
              Remove counterparty risks in global trade. Coordinate buyers, sellers, carriers, and inspectors trustlessly through Stellar smart contracts.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/dashboard" className="bg-black text-white px-8 py-3 text-sm font-semibold rounded hover:bg-slate-800 transition-all active:scale-95">
                Access Trade Dashboard
              </Link>
              <Link href="/transfer" className="bg-white border border-slate-200 text-slate-900 px-8 py-3 text-sm font-semibold rounded hover:bg-slate-50 transition-all active:scale-95">
                Direct XLM Transfer
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-square w-full max-w-md mx-auto bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm p-8 relative flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Smart Contract ID</p>
                  <p className="font-mono text-sm text-slate-950 font-bold mt-1">CBAF...LJ47</p>
                </div>
                <span className="material-symbols-outlined text-slate-900 text-3xl">encrypted</span>
              </div>
              <div className="space-y-4">
                <div className="h-px bg-slate-200 w-full"></div>
                <div className="flex justify-between text-xs text-slate-500 font-semibold uppercase tracking-widest">
                  <span>Escrow Balance</span>
                  <span className="text-emerald-600">Locked</span>
                </div>
                <div className="text-3xl font-extrabold text-slate-950">
                  50,000 XLM
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline Console Section */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Global Pipeline Console</h2>
              <p className="text-sm text-slate-500 mt-1">Route: SIN (Singapore) → HAM (Hamburg) • Shipment ID: #CT-88291</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#3B82F6]"></span>
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active</span>
              </div>
            </div>
          </div>

          {/* Bento Grid Layout for Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            {/* Milestone 1 */}
            <div className="high-air-card p-6 flex flex-col justify-between h-48 rounded-xl relative overflow-hidden shadow-sm">
              <div className="flex justify-between items-start">
                <div className="w-8 h-8 flex items-center justify-center bg-[#10B981] text-white rounded-full">
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <span className="text-xs font-bold text-slate-400">Oct 12</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Order Funded</h3>
                <p className="text-xs text-slate-500 mt-1">Escrow wallet verified &amp; locked.</p>
              </div>
            </div>

            {/* Milestone 2 */}
            <div className="high-air-card p-6 flex flex-col justify-between h-48 rounded-xl relative overflow-hidden shadow-sm">
              <div className="flex justify-between items-start">
                <div className="w-8 h-8 flex items-center justify-center bg-[#10B981] text-white rounded-full">
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <span className="text-xs font-bold text-slate-400">Oct 14</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Cargo Shipped</h3>
                <p className="text-xs text-slate-500 mt-1">Vessel: &quot;Ever Given II&quot;</p>
              </div>
            </div>

            {/* Milestone 3 */}
            <div className="high-air-card border-2 border-black p-6 flex flex-col justify-between h-48 rounded-xl relative overflow-hidden shadow-sm bg-white">
              <div className="flex justify-between items-start">
                <div className="w-8 h-8 flex items-center justify-center border-2 border-[#3B82F6] rounded-full relative">
                  <div className="w-2.5 h-2.5 bg-[#3B82F6] rounded-full animate-status-pulse"></div>
                </div>
                <span className="text-xs font-bold text-black tracking-widest uppercase">IN PROGRESS</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Inspection Clear</h3>
                <p className="text-xs text-slate-500 mt-1">Awaiting digital signature from Hamburg Port.</p>
              </div>
            </div>

            {/* Milestone 4 */}
            <div className="high-air-card p-6 flex flex-col justify-between h-48 rounded-xl relative overflow-hidden shadow-sm opacity-60">
              <div className="flex justify-between items-start">
                <div className="w-8 h-8 flex items-center justify-center bg-slate-200 text-slate-500 rounded-full">
                  <span className="material-symbols-outlined text-sm">hourglass_empty</span>
                </div>
                <span className="text-xs font-bold text-slate-400">Pending</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Payment Released</h3>
                <p className="text-xs text-slate-500 mt-1">Instant settlement upon validation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-cover bg-center aspect-video rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-400"
               style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA0TMXfAyyia6zF06CB90XxMFNGx9kMp8iGNdNGJMDv5uCqR9hI2_cavHO_X4sq7FENcILA0oXUuVjCyv1fjazU7pdHkbkSF1nxhtU7-qUh5jpJJbN9-96MfW0emrqPUTWIqGAdr06_mfBDJaJfiP4lq3ZtfmtX1dKB18D6Px9mowGipWvGBEzYBGg_m2KD_HEnFqHLUYNYpWMlK6aYp0DvIGgkD952cqfiD7oUA76OYRO9L6OXgeL_mkeI3L8Sil7bgzj0c_-ASNI')` }}>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">Trustless Verification at Every Port</h2>
            <p className="text-slate-500 leading-relaxed">
              ChainTrace integrates with port authorities and independent inspectors via Soroban smart contracts. No more manual paperwork or delayed wire transfers. Once a verified inspector uploads the hash of the bill of lading, funds are automatically triggered.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#10B981] mt-0.5">task_alt</span>
                <div>
                  <p className="font-bold text-sm text-slate-900">Immutable Audit Trail</p>
                  <p className="text-xs text-slate-500 mt-0.5">Every handover is timestamped and signed on the Stellar ledger.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#10B981] mt-0.5">task_alt</span>
                <div>
                  <p className="font-bold text-sm text-slate-900">Zero Gas Soroban</p>
                  <p className="text-xs text-slate-500 mt-0.5">Execute complex logic with the industry&apos;s lowest overhead.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-black p-8 sm:p-12 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Secure Your Next Trade</h2>
            <p className="text-slate-400 text-sm sm:text-base">Start your first milestone-based shipment on ChainTrace today.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard" className="bg-white text-black px-8 py-3 text-sm font-semibold rounded hover:bg-slate-100 transition-colors">
              Launch App
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
