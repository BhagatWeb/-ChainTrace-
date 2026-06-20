'use client';

import { useState } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { useOrders } from '@/hooks/useOrders';
import { OrderCard } from '@/components/orders/OrderCard';
import Link from 'next/link';

export default function DashboardPage() {
  const { publicKey, isConnected, connect } = useWallet();
  const { orders, loading } = useOrders(publicKey || undefined);
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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Trade Dashboard</h1>
          <p className="text-sm text-slate-500">Track your supply chain orders and escrow milestones with on-chain precision.</p>
        </div>
        {isConnected && (
          <Link href="/orders/create" className="bg-black text-white px-6 h-12 rounded font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-95 whitespace-nowrap text-sm">
            <span className="material-symbols-outlined text-[20px]">add</span>
            New Order
          </Link>
        )}
      </div>

      {/* Role Filter Tabs */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 mb-8 border-b border-slate-200 pb-2">
        {([
          { id: 'all', label: 'As All' },
          { id: 'buyer', label: 'As Buyer' },
          { id: 'supplier', label: 'As Supplier' },
          { id: 'shipper', label: 'As Shipper' },
          { id: 'inspector', label: 'As Inspector' },
        ] as const).map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-black text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Disconnected Alert State */}
      {!isConnected ? (
        <div className="mb-8 bg-white border-2 border-dashed border-slate-200 p-8 rounded-xl flex flex-col items-center justify-center text-center space-y-4 py-16">
          <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
            <span className="material-symbols-outlined text-[32px]">account_balance_wallet</span>
          </div>
          <div className="max-w-md">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Wallet Disconnected</h3>
            <p className="text-sm text-slate-500">Please connect your wallet using the button in the top right to view your dashboard and manage your trade smart contracts.</p>
          </div>
          <button
            onClick={() => connect('freighter')}
            className="border border-black px-6 py-2 text-xs font-semibold rounded hover:bg-black hover:text-white transition-all"
          >
            Connect Now
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 p-6 rounded-lg h-56 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-20 h-4 bg-slate-200 rounded skeleton-pulse"></div>
                    <div className="w-full h-8 bg-slate-200 rounded skeleton-pulse"></div>
                    <div className="w-2/3 h-4 bg-slate-200 rounded skeleton-pulse"></div>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded skeleton-pulse"></div>
                </div>
              ))}
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="bg-white border border-slate-200 p-12 rounded-xl text-center">
              <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">inbox</span>
              <p className="text-sm text-slate-500">No orders found matching this role filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}

          {/* Network Skeleton Preview Section */}
          <div className="border-t border-slate-200 pt-8 mt-12">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-slate-400">sync</span>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Network Live Status</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-40 grayscale pointer-events-none">
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg h-44 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-20 h-4 bg-slate-200 rounded skeleton-pulse"></div>
                  <div className="w-full h-6 bg-slate-200 rounded skeleton-pulse"></div>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded skeleton-pulse"></div>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg h-44 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-20 h-4 bg-slate-200 rounded skeleton-pulse"></div>
                  <div className="w-full h-6 bg-slate-200 rounded skeleton-pulse"></div>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded skeleton-pulse"></div>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg h-44 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-20 h-4 bg-slate-200 rounded skeleton-pulse"></div>
                  <div className="w-full h-6 bg-slate-200 rounded skeleton-pulse"></div>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded skeleton-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
