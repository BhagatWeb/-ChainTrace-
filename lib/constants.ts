export const STELLAR_RPC_URL =
  process.env.NEXT_PUBLIC_STELLAR_RPC_URL || 'https://soroban-testnet.stellar.org';

export const HORIZON_URL = 'https://horizon-testnet.stellar.org';

export const NETWORK_PASSPHRASE = 'Test SDF Network ; September 2015';

export const EXPLORER_BASE_URL = 'https://stellar.expert/explorer/testnet';

export const ESCROW_CONTRACT_ID =
  process.env.NEXT_PUBLIC_ESCROW_CONTRACT_ID || 'CBAFHUW7TL73RG4KYSL53ZF4N4NCJK76KXL3NHKEDDWE2GPVHA52LJ47';

export const ORDER_CONTRACT_ID =
  process.env.NEXT_PUBLIC_ORDER_CONTRACT_ID || 'CB56DGFX43XUXN2OASKM3SF6I3WWNYUM6KE7HKUKX3JSLZPYQSRQXOHH';

export const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  created: { bg: 'bg-zinc-800/40 border border-zinc-800', text: 'text-zinc-300', dot: 'bg-zinc-400' },
  funded: { bg: 'bg-zinc-800/60 border border-zinc-700/50', text: 'text-zinc-200', dot: 'bg-zinc-300' },
  shipped: { bg: 'bg-zinc-900 border border-zinc-800', text: 'text-zinc-300', dot: 'bg-white' },
  delivered: { bg: 'bg-zinc-950 border border-zinc-800', text: 'text-zinc-300', dot: 'bg-zinc-400' },
  inspected_passed: { bg: 'bg-white/10 border border-white/20', text: 'text-white', dot: 'bg-white' },
  inspected_failed: { bg: 'bg-red-500/10 border border-red-500/20', text: 'text-red-400', dot: 'bg-red-500' },
  refunded: { bg: 'bg-zinc-950 border border-zinc-900', text: 'text-zinc-500', dot: 'bg-zinc-700' },
};

export const STATUS_LABELS: Record<string, string> = {
  created: 'Created',
  funded: 'Funded',
  shipped: 'Shipped',
  delivered: 'Delivered',
  inspected_passed: 'Passed Quality Check',
  inspected_failed: 'Failed Quality Check',
  refunded: 'Refunded',
};
