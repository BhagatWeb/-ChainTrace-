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
      <div className="card-interactive group" id={`order-card-${order.id}`}>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-white group-hover:text-zinc-300 transition-colors">
            Order #{order.id}
          </h3>
          <Badge status={order.status} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <FiUser className="h-3.5 w-3.5" />
            Buyer: {stellar.formatAddress(order.buyer, 4, 4)}
          </span>
          <span className="flex items-center gap-1.5">
            <FiUser className="h-3.5 w-3.5" />
            Supplier: {stellar.formatAddress(order.supplier, 4, 4)}
          </span>
          <span className="flex items-center gap-1.5">
            <FiTruck className="h-3.5 w-3.5" />
            Shipper: {stellar.formatAddress(order.shipper, 4, 4)}
          </span>
          <span className="flex items-center gap-1.5">
            <FiSearch className="h-3.5 w-3.5" />
            Inspector: {stellar.formatAddress(order.inspector, 4, 4)}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-zinc-850 pt-3">
          <p className="text-base font-bold text-white">
            {Number(order.amount).toFixed(2)}{' '}
            <span className="text-sm font-normal text-zinc-400">XLM</span>
          </p>
          <span className="flex items-center gap-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
            Details <FiArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
