import Link from 'next/link';
import { Badge } from '../ui/Badge';
import { stellar } from '@/lib/stellar';
import { FiArrowRight, FiUser, FiTruck, FiSearch } from 'react-icons/fi';
import type { Order } from '@/lib/types';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <Link href={`/orders/${order.id}`}>
      <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg group hover:border-slate-900 transition-colors cursor-pointer" id={`order-card-${order.id}`}>
        <div className="flex items-start justify-between gap-3 mb-6">
          <h3 className="font-bold text-slate-900 text-base">
            Order #{order.id}
          </h3>
          <Badge status={order.status} />
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <FiUser className="h-3.5 w-3.5" />
              Buyer: {stellar.formatAddress(order.buyer, 4, 4)}
            </span>
            <span className="flex items-center gap-1.5">
              <FiUser className="h-3.5 w-3.5" />
              Supplier: {stellar.formatAddress(order.supplier, 4, 4)}
            </span>
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <FiTruck className="h-3.5 w-3.5" />
              Shipper: {stellar.formatAddress(order.shipper, 4, 4)}
            </span>
            <span className="flex items-center gap-1.5">
              <FiSearch className="h-3.5 w-3.5" />
              Inspector: {stellar.formatAddress(order.inspector, 4, 4)}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
          <p className="text-lg font-bold text-slate-900">
            {Number(order.amount).toFixed(2)}{' '}
            <span className="text-xs font-normal text-slate-500">XLM</span>
          </p>
          <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">chevron_right</span>
        </div>
      </div>
    </Link>
  );
}
