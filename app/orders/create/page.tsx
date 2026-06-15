'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/hooks/useWallet';
import { orderClient } from '@/lib/contracts/order-client';
import { Button } from '@/components/ui/Button';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
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
      const res = await orderClient.createOrder({
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
      <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-6">
        <FiArrowLeft /> Back to Dashboard
      </Link>

      <div className="card">
        <h2 className="text-xl font-bold text-white mb-1">Create Supply Chain Order</h2>
        <p className="text-xs text-zinc-400 mb-6">
          Define supplier, shipper, inspector, and lockable escrow budget to launch the trade pipeline.
        </p>

        {!isConnected ? (
          <p className="text-center py-6 text-sm text-zinc-400">
            Please connect your wallet first.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                Supplier Address
              </label>
              <input
                type="text"
                placeholder="G..."
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                disabled={loading}
                className="field-input font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                Logistics Shipper Address
              </label>
              <input
                type="text"
                placeholder="G..."
                value={shipper}
                onChange={(e) => setShipper(e.target.value)}
                disabled={loading}
                className="field-input font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                Inspector Address
              </label>
              <input
                type="text"
                placeholder="G..."
                value={inspector}
                onChange={(e) => setInspector(e.target.value)}
                disabled={loading}
                className="field-input font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
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
                className="field-input"
                required
              />
            </div>

            <Button
              type="submit"
              isLoading={loading}
              className="w-full h-11 flex justify-center items-center gap-2"
            >
              <FiPlus /> Initialize Order
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
