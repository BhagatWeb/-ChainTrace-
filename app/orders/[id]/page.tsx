'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWallet } from '@/hooks/useWallet';
import { orderClient } from '@/lib/contracts/order-client';
import { escrowClient } from '@/lib/contracts/escrow-client';
import { useEscrow } from '@/hooks/useEscrow';
import { useContractEvents } from '@/hooks/useContractEvents';
import { ORDER_CONTRACT_ID } from '@/lib/constants';
import { stellar } from '@/lib/stellar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import {
  FiArrowLeft,
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiSearch,
  FiDollarSign,
  FiLock,
  FiUnlock,
  FiExternalLink,
  FiActivity,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import type { Order } from '@/lib/types';

export default function OrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const orderId = Number(id);
  const { publicKey, isConnected } = useWallet();
  const { escrow, refetch: refetchEscrow } = useEscrow(orderId, publicKey || undefined);
  const { events, loading: eventsLoading } = useContractEvents(ORDER_CONTRACT_ID);

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const loadOrder = useCallback(async () => {
    if (!publicKey || !orderId) return;
    try {
      setLoading(true);
      const data = await orderClient.getOrder(orderId, publicKey);
      setOrder(data);
    } catch {
      toast.error('Failed to load order details.');
    } finally {
      setLoading(false);
    }
  }, [orderId, publicKey]);

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  const handleAction = async (action: () => Promise<{ hash: string }>, successMsg: string) => {
    try {
      setActionLoading(true);
      setTxHash(null);
      const res = await action();
      setTxHash(res.hash);
      toast.success(successMsg);
      await loadOrder();
      await refetchEscrow();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Action failed';
      toast.error(msg);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading || !order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white mx-auto mb-4" />
        <p className="text-zinc-400">Loading order metadata...</p>
      </div>
    );
  }

  const isBuyer = publicKey && publicKey.toUpperCase() === order.buyer.toUpperCase();
  const isSupplier = publicKey && publicKey.toUpperCase() === order.supplier.toUpperCase();
  const isShipper = publicKey && publicKey.toUpperCase() === order.shipper.toUpperCase();
  const isInspector = publicKey && publicKey.toUpperCase() === order.inspector.toUpperCase();

  // Timeline steps
  const steps = [
    { label: 'Created', desc: 'Order declared on-chain', active: true, icon: FiClock },
    {
      label: 'Funded',
      desc: 'Buyer deposited XLM in Escrow',
      active: ['funded', 'shipped', 'delivered', 'inspected_passed', 'inspected_failed', 'refunded'].includes(order.status),
      icon: FiDollarSign,
    },
    {
      label: 'Shipped',
      desc: 'Shipper dispatched cargo',
      active: ['shipped', 'delivered', 'inspected_passed', 'inspected_failed', 'refunded'].includes(order.status),
      icon: FiTruck,
    },
    {
      label: 'Delivered',
      desc: 'Goods reached destination',
      active: ['delivered', 'inspected_passed', 'inspected_failed', 'refunded'].includes(order.status),
      icon: FiCheckCircle,
    },
    {
      label: 'Inspected',
      desc: 'Inspector verified quality',
      active: ['inspected_passed', 'inspected_failed', 'refunded'].includes(order.status),
      icon: FiSearch,
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-6"
      >
        <FiArrowLeft /> Back to Dashboard
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column: metadata & actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main order card */}
          <div className="card">
            <div className="flex items-center justify-between border-b border-zinc-850 pb-4 mb-6">
              <div>
                <h1 className="text-xl font-bold text-white">Order #{order.id}</h1>
                <p className="text-xs text-zinc-500 font-mono">Created at block ledger {order.createdAt}</p>
              </div>
              <Badge status={order.status} />
            </div>

            <div className="space-y-4">
              <div>
                <span className="block text-xs font-semibold text-zinc-500 mb-1">Buyer Address</span>
                <span className="text-sm font-mono block bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-900 truncate">
                  {order.buyer}
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-zinc-500 mb-1">Supplier Address</span>
                <span className="text-sm font-mono block bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-900 truncate">
                  {order.supplier}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs font-semibold text-zinc-500 mb-1">Logistics Shipper</span>
                  <span className="text-xs font-mono block bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-900 truncate">
                    {stellar.formatAddress(order.shipper, 6, 6)}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-zinc-500 mb-1">Quality Inspector</span>
                  <span className="text-xs font-mono block bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-900 truncate">
                    {stellar.formatAddress(order.inspector, 6, 6)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Workflow actions */}
          <div className="card">
            <h3 className="text-sm font-semibold text-white mb-4">Pipeline Actions</h3>

            {/* Actions based on role and status */}
            <div className="space-y-3">
              {order.status === 'created' && isBuyer && (
                <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-850">
                  <p className="text-xs text-zinc-400 mb-3">
                    As the Buyer, fund the escrow vault with {Number(order.amount).toFixed(2)} XLM to initiate shipment.
                  </p>
                  <Button
                    onClick={() =>
                      handleAction(
                        () => escrowClient.deposit(publicKey, order.id, order.amount),
                        'Escrow successfully funded!'
                      )
                    }
                    isLoading={actionLoading}
                    className="w-full"
                  >
                    Fund Escrow ({Number(order.amount).toFixed(2)} XLM)
                  </Button>
                </div>
              )}

              {order.status === 'funded' && isShipper && (
                <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-850">
                  <p className="text-xs text-zinc-400 mb-3">
                    As the Shipper, confirm dispatch of cargo to update the status to Shipped.
                  </p>
                  <Button
                    onClick={() =>
                      handleAction(
                        () => orderClient.shipOrder(publicKey, order.id),
                        'Cargo marked as shipped!'
                      )
                    }
                    isLoading={actionLoading}
                    className="w-full"
                  >
                    Dispatched / Ship Order
                  </Button>
                </div>
              )}

              {order.status === 'shipped' && isShipper && (
                <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-850">
                  <p className="text-xs text-zinc-400 mb-3">
                    As the Shipper, log successful delivery to trigger inspection.
                  </p>
                  <Button
                    onClick={() =>
                      handleAction(
                        () => orderClient.deliverOrder(publicKey, order.id),
                        'Cargo marked as delivered!'
                      )
                    }
                    isLoading={actionLoading}
                    className="w-full"
                  >
                    Confirm Delivery
                  </Button>
                </div>
              )}

              {order.status === 'delivered' && isInspector && (
                <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-850 space-y-3">
                  <p className="text-xs text-zinc-400">
                    As the Quality Inspector, sign off on the inspection report. Passing will automatically release escrowed funds to the supplier.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() =>
                        handleAction(
                          () => orderClient.inspectOrder(publicKey, order.id, true),
                          'Inspection passed! Escrow released.'
                        )
                      }
                      isLoading={actionLoading}
                      className="flex-1"
                    >
                      Pass Quality Check
                    </Button>
                    <Button
                      onClick={() =>
                        handleAction(
                          () => orderClient.inspectOrder(publicKey, order.id, false),
                          'Inspection marked as failed.'
                        )
                      }
                      isLoading={actionLoading}
                      variant="danger"
                      className="flex-1"
                    >
                      Fail Quality Check
                    </Button>
                  </div>
                </div>
              )}

              {order.status === 'inspected_failed' && isBuyer && (
                <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-850">
                  <p className="text-xs text-zinc-400 mb-3">
                    The inspection failed. As the Buyer, withdraw your deposit from the escrow vault.
                  </p>
                  <Button
                    onClick={() =>
                      handleAction(
                        () => orderClient.refundOrder(publicKey, order.id),
                        'Funds successfully refunded!'
                      )
                    }
                    isLoading={actionLoading}
                    variant="danger"
                    className="w-full"
                  >
                    Request Escrow Refund
                  </Button>
                </div>
              )}

              {/* Default fallback info */}
              {!isBuyer && !isShipper && !isInspector && !isSupplier && (
                <p className="text-xs text-zinc-500 italic py-2">
                  No actions available for your connected wallet role.
                </p>
              )}
            </div>

            {/* Transaction confirmation feedback */}
            {txHash && (
              <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-950 p-3.5 flex items-center justify-between text-xs animate-slide-up">
                <span className="text-zinc-400">Transaction hash:</span>
                <a
                  href={stellar.getExplorerLink(txHash, 'tx')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-white hover:underline flex items-center gap-1"
                >
                  {stellar.formatAddress(txHash, 6, 6)}
                  <FiExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Escrow Vault & Visual timeline */}
        <div className="space-y-6">
          {/* Escrow Details */}
          <div className="card">
            <h3 className="text-sm font-semibold text-white mb-4">Escrow Status</h3>
            {escrow ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    {escrow.isActive ? <FiLock className="text-white" /> : <FiUnlock className="text-zinc-500" />}
                    State
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    escrow.isActive ? 'bg-zinc-800 text-zinc-200' : 'bg-white/10 text-white'
                  }`}>
                    {escrow.isActive ? 'Locked' : 'Settled'}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-zinc-850 pt-3">
                  <span className="text-xs text-zinc-400">Escrow Value</span>
                  <span className="text-sm font-bold text-white">{Number(escrow.amount).toFixed(2)} XLM</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-zinc-500 italic">No active deposit locks found in escrow contract.</p>
            )}
          </div>

          {/* Visual Timeline */}
          <div className="card">
            <h3 className="text-sm font-semibold text-white mb-6">Delivery Timeline</h3>
            <div className="relative pl-6 space-y-6">
              {/* Vertical line connecting steps */}
              <div className="absolute left-2.5 top-2 bottom-2 w-px bg-zinc-800" />

              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="relative flex items-start gap-3">
                    {/* Circle icon */}
                    <div className={`absolute -left-6 flex h-6 w-6 items-center justify-center rounded-full border text-xs transition-colors ${
                      step.active
                        ? 'border-white bg-white text-black'
                        : 'border-zinc-850 bg-zinc-950 text-zinc-600'
                    }`}>
                      <Icon className="h-3 w-3" />
                    </div>
                    <div>
                      <h4 className={`text-xs font-semibold ${step.active ? 'text-white' : 'text-zinc-600'}`}>
                        {step.label}
                      </h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-time Events Log */}
          <div className="card">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-1.5">
              <FiActivity className="text-zinc-400" />
              Real-time Events
            </h3>
            {eventsLoading ? (
              <div className="space-y-2">
                {[0, 1].map((i) => (
                  <div key={i} className="h-12 animate-pulse bg-zinc-900 rounded-lg" />
                ))}
              </div>
            ) : events.length === 0 ? (
              <p className="text-xs text-zinc-500 italic">No events captured yet.</p>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {events.map((evt) => (
                  <div
                    key={evt.id}
                    className="rounded-lg border border-zinc-850 bg-zinc-950/40 p-2.5 text-[11px] font-mono animate-fade-in"
                  >
                    <div className="flex justify-between text-white font-semibold mb-1">
                      <span>{evt.topic.join(' / ')}</span>
                      <span className="text-zinc-500">L{evt.ledger}</span>
                    </div>
                    <p className="text-zinc-400 truncate">Value: {JSON.stringify(evt.value)}</p>
                    <a
                      href={stellar.getExplorerLink(evt.txHash, 'tx')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-[10px] text-zinc-400 hover:text-white"
                    >
                      Tx: {stellar.formatAddress(evt.txHash, 4, 4)}
                      <FiExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
