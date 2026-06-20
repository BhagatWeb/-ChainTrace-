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
import Link from 'next/link';
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
        <span className="animate-spin material-symbols-outlined text-4xl text-slate-400 mb-4">progress_activity</span>
        <p className="text-slate-500">Loading order metadata...</p>
      </div>
    );
  }

  const isBuyer = publicKey && publicKey.toUpperCase() === order.buyer.toUpperCase();
  const isSupplier = publicKey && publicKey.toUpperCase() === order.supplier.toUpperCase();
  const isShipper = publicKey && publicKey.toUpperCase() === order.shipper.toUpperCase();
  const isInspector = publicKey && publicKey.toUpperCase() === order.inspector.toUpperCase();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header & Top Navigation */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Link href="/dashboard" className="font-semibold text-xs uppercase tracking-widest hover:text-black transition-colors">
              Dashboard
            </Link>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-xs text-slate-900 uppercase tracking-widest">Order Details</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Order #{order.id}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <Badge status={order.status} />
            <span className="text-xs text-slate-500">Created at block ledger {order.createdAt}</span>
          </div>
        </div>

        {/* Action Buttons based on roles */}
        <div className="flex flex-wrap gap-3">
          {order.status === 'created' && isBuyer && (
            <button
              onClick={() =>
                handleAction(
                  () => escrowClient.deposit(publicKey, order.id, order.amount),
                  'Escrow successfully funded!'
                )
              }
              disabled={actionLoading}
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded font-semibold text-xs hover:bg-slate-800 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-base">payments</span>
              Fund Escrow ({Number(order.amount).toFixed(2)} XLM)
            </button>
          )}

          {order.status === 'funded' && isShipper && (
            <button
              onClick={() =>
                handleAction(
                  () => orderClient.shipOrder(publicKey, order.id),
                  'Cargo marked as shipped!'
                )
              }
              disabled={actionLoading}
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded font-semibold text-xs hover:bg-slate-800 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-base">local_shipping</span>
              Dispatched / Ship Order
            </button>
          )}

          {order.status === 'shipped' && isShipper && (
            <button
              onClick={() =>
                handleAction(
                  () => orderClient.deliverOrder(publicKey, order.id),
                  'Cargo marked as delivered!'
                )
              }
              disabled={actionLoading}
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded font-semibold text-xs hover:bg-slate-800 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-base">task_alt</span>
              Confirm Delivery
            </button>
          )}

          {order.status === 'delivered' && isInspector && (
            <div className="flex gap-2">
              <button
                onClick={() =>
                  handleAction(
                    () => orderClient.inspectOrder(publicKey, order.id, true),
                    'Inspection passed! Escrow released.'
                  )
                }
                disabled={actionLoading}
                className="flex items-center gap-2 bg-black text-white px-4 py-3 rounded font-semibold text-xs hover:bg-slate-800 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-base">verified_user</span>
                Pass Quality Check
              </button>
              <button
                onClick={() =>
                  handleAction(
                    () => orderClient.inspectOrder(publicKey, order.id, false),
                    'Inspection marked as failed.'
                  )
                }
                disabled={actionLoading}
                className="flex items-center gap-2 bg-white border border-red-500 text-red-500 px-4 py-3 rounded font-semibold text-xs hover:bg-red-50 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-base font-bold">close</span>
                Fail Quality Check
              </button>
            </div>
          )}

          {order.status === 'inspected_failed' && isBuyer && (
            <button
              onClick={() =>
                handleAction(
                  () => orderClient.refundOrder(publicKey, order.id),
                  'Funds successfully refunded!'
                )
              }
              disabled={actionLoading}
              className="flex items-center gap-2 bg-red-650 text-white px-6 py-3 rounded font-semibold text-xs hover:bg-red-700 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-base">undo</span>
              Request Escrow Refund
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Spec Grid & Details */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Order Specification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order ID</span>
                <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  CT-ORDER-{order.id}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Escrow Value</span>
                <div className="text-sm font-extrabold text-slate-900">
                  {Number(order.amount).toFixed(2)} <span className="text-xs text-slate-500 font-normal">XLM</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Buyer</span>
                <div className="text-xs font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-200 truncate">
                  {order.buyer}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Supplier</span>
                <div className="text-xs font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-200 truncate">
                  {order.supplier}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Logistics Provider</span>
                <div className="text-xs font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-200 truncate">
                  {order.shipper}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Independent Inspector</span>
                <div className="text-xs font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-200 truncate">
                  {order.inspector}
                </div>
              </div>
            </div>
          </div>

          {/* Map mockup */}
          <div className="bg-slate-900 border border-slate-200 rounded-xl overflow-hidden h-64 relative shadow-sm">
            <div className="w-full h-full bg-cover bg-center opacity-60"
                 style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDgZxAdeW7c-C6eiWyDPQz3FVXQ6KLfKS9iXAMq3QpdYU3qHhPGzwbuB0PzCvKOrgiMJxdI3LXvVTUWWZYiP9P8SxAYlUshinuD1TqSUS0iGfcsLvab8e8lZm-0eGS2p7VvLqOBbldEz1kD3Vc1fBnyzEIKw1qQ-g4AE69jfof05vDKtZux0pH5UKmRz8ChX_Os977-rlS_lJoDdOsyIRFrP3fu9VJMfk03FtJC7Fg2AZL7JVIAMw-m0p7vo74Mn_k6bBHMLDFOssY')` }} />
            <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-md text-white px-4 py-2 rounded shadow-sm border border-white/10">
              <div className="text-[10px] font-bold uppercase opacity-70">Current Location</div>
              <div className="text-sm font-bold mt-0.5">Maritime Transit Zone</div>
            </div>
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-slate-900 px-4 py-2 rounded shadow-sm border border-slate-200 flex items-center gap-2 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Real-time Telemetry Active
            </div>
          </div>

          {/* Action confirmation link */}
          {txHash && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center text-xs animate-slide-up">
              <span className="text-slate-500">Transaction hash:</span>
              <a
                href={stellar.getExplorerLink(txHash, 'tx')}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-black hover:underline flex items-center gap-1 font-bold"
              >
                {stellar.formatAddress(txHash, 6, 6)}
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          )}
        </div>

        {/* Right Column: Ledger Event Logs & Document Verifications */}
        <div className="lg:col-span-4 space-y-8">
          {/* On-Chain Event Ledger */}
          <div className="bg-black text-white p-6 rounded-xl flex flex-col h-[400px] shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-80">On-Chain Event Ledger</h3>
              <span className="material-symbols-outlined text-blue-400">security</span>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pr-1">
              {eventsLoading ? (
                <div className="space-y-3">
                  {[0, 1].map((i) => (
                    <div key={i} className="h-14 animate-pulse bg-slate-900 rounded-lg" />
                  ))}
                </div>
              ) : events.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No events captured yet.</p>
              ) : (
                events.map((evt) => (
                  <div key={evt.id} className="group border-l-2 border-white/20 pl-4 py-1 hover:border-blue-400 transition-colors">
                    <div className="flex justify-between items-start mb-1 text-xs">
                      <span className="font-bold text-blue-300">{evt.topic.join(' / ')}</span>
                      <span className="opacity-50 text-[10px]">L{evt.ledger}</span>
                    </div>
                    <p className="text-[11px] text-white/80 line-clamp-2">
                      Value:{' '}
                      {JSON.stringify(evt.value, (_, v) =>
                        typeof v === 'bigint' ? v.toString() : v
                      )}
                    </p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="font-mono text-[9px] text-white/40">{stellar.formatAddress(evt.txHash, 6, 6)}</span>
                      <a
                        href={stellar.getExplorerLink(evt.txHash, 'tx')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline text-[9px] flex items-center gap-0.5"
                      >
                        View <span className="material-symbols-outlined text-[10px]">open_in_new</span>
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Verification documents mockup */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Verification Files</h4>
            <ul className="space-y-3">
              <li className="flex items-center justify-between p-2 hover:bg-slate-50 rounded transition-colors group cursor-pointer border border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-500">description</span>
                  <span className="text-xs font-semibold text-slate-900">Bill_of_Lading.pdf</span>
                </div>
                <span className="material-symbols-outlined text-slate-400 group-hover:text-black">download</span>
              </li>
              <li className="flex items-center justify-between p-2 hover:bg-slate-50 rounded transition-colors group cursor-pointer border border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-500">verified</span>
                  <span className="text-xs font-semibold text-slate-900">Inspection_Report.sig</span>
                </div>
                <span className="material-symbols-outlined text-slate-400 group-hover:text-black">download</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
