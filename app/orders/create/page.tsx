'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/hooks/useWallet';
import { orderClient } from '@/lib/contracts/order-client';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function CreateOrderPage() {
  const router = useRouter();
  const { publicKey, isConnected } = useWallet();
  const [supplier, setSupplier] = useState('');
  const [shipper, setShipper] = useState('');
  const [inspector, setInspector] = useState('');
  const [amountXlm, setAmountXlm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !publicKey) {
      toast.error('Connect your wallet first.');
      return;
    }

    if (!supplier || !shipper || !inspector || !amountXlm) {
      toast.error('All fields are required.');
      return;
    }

    if (isNaN(Number(amountXlm)) || Number(amountXlm) <= 0) {
      toast.error('Enter a valid order amount.');
      return;
    }

    try {
      setLoading(true);
      await orderClient.createOrder({
        publicKey,
        supplier,
        shipper,
        inspector,
        amountXlm,
      });

      toast.success('Order created successfully!');
      router.push('/dashboard');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create order';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-12 animate-fade-in">
      <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-black transition-colors mb-6 font-semibold uppercase tracking-widest">
        <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Dashboard
      </Link>

      <div className="card border border-slate-200 bg-white">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Create Supply Chain Order</h2>
        <p className="text-xs text-slate-500 mb-6">
          Define supplier, shipper, inspector, and lockable escrow budget to launch the trade pipeline.
        </p>

        {!isConnected ? (
          <div className="text-center py-8 bg-slate-50 rounded-lg border border-slate-200 p-4">
            <span className="material-symbols-outlined text-3xl text-slate-400 mb-2">account_balance_wallet</span>
            <p className="text-sm text-slate-600 font-semibold">Please connect your wallet first.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                Supplier Address
              </label>
              <input
                type="text"
                placeholder="G..."
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                disabled={loading}
                className="w-full h-12 bg-white border border-slate-200 rounded-lg px-4 text-slate-900 outline-none active-ring focus:border-black transition-all font-mono text-sm"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                Logistics Shipper Address
              </label>
              <input
                type="text"
                placeholder="G..."
                value={shipper}
                onChange={(e) => setShipper(e.target.value)}
                disabled={loading}
                className="w-full h-12 bg-white border border-slate-200 rounded-lg px-4 text-slate-900 outline-none active-ring focus:border-black transition-all font-mono text-sm"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                Inspector Address
              </label>
              <input
                type="text"
                placeholder="G..."
                value={inspector}
                onChange={(e) => setInspector(e.target.value)}
                disabled={loading}
                className="w-full h-12 bg-white border border-slate-200 rounded-lg px-4 text-slate-900 outline-none active-ring focus:border-black transition-all font-mono text-sm"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                Order Value (XLM)
              </label>
              <input
                type="number"
                step="0.000001"
                min="0.000001"
                placeholder="100.0"
                value={amountXlm}
                onChange={(e) => setAmountXlm(e.target.value)}
                disabled={loading}
                className="w-full h-12 bg-white border border-slate-200 rounded-lg px-4 text-slate-900 outline-none active-ring focus:border-black transition-all text-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white h-12 rounded-lg font-semibold hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <span className="animate-spin material-symbols-outlined text-[18px]">progress_activity</span>
                  Initializing...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  Initialize Order
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
