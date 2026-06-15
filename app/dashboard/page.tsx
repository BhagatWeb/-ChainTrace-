'use client';

import { useState } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { useOrders } from '@/hooks/useOrders';
import { OrderCard } from '@/components/orders/OrderCard';
import Link from 'next/link';
import { FiPlus, FiAlertCircle } from 'react-icons/fi';

export default function DashboardPage() {
  const { publicKey, isConnected } = useWallet();
  const { orders, loading, error } = useOrders(publicKey || undefined);
  const [activeTab, setActiveTab] = useState<'all' | 'buyer' | 'supplier' | 'shipper' | 'inspector'>('all');

  const filteredOrders = orders.filter((order) => {
    if (!publicKey) return false;
    const pub = publicKey.toUpperCase();
    if (activeTab === 'buyer') return order.buyer.toUpperCase() === pub;
    if (activeTab === 'supplier') return order.supplier.toUpperCase() === pub;
    if (activeTab === 'shipper') return order.shipper.toUpperCase() === pub;
    if (activeTab === 'inspector') return order.inspector.toUpperCase() === pub;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Trade Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Track your supply chain orders and escrow milestones.
          </p>
        </div>
        {isConnected && (
          <Link href="/orders/create" className="btn-primary h-10 px-4 inline-flex items-center gap-1.5 self-start sm:self-auto text-xs font-semibold">
            <FiPlus /> New Order
          </Link>
        )}
      </div>

      {!isConnected ? (
        <div className="card text-center py-12">
          <FiAlertCircle className="mx-auto h-12 w-12 text-zinc-600 mb-3" />
          <p className="text-sm text-zinc-400">
            Please connect your wallet using the button in the top right to view your dashboard.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Tab selectors */}
          <div className="flex border-b border-zinc-800 gap-2 overflow-x-auto pb-px">
            {(['all', 'buyer', 'supplier', 'shipper', 'inspector'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`border-b-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-white text-white'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                As {tab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-40 animate-pulse rounded-xl bg-zinc-900 border border-zinc-800" />
              ))}
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-sm text-zinc-500">No orders found matching this role filter.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
