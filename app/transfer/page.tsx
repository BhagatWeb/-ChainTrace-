'use client';

import { useState } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { stellar } from '@/lib/stellar';
import toast from 'react-hot-toast';

export default function TransferPage() {
  const { publicKey, isConnected, balance, refreshBalance } = useWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [loading, setLoading] = useState(false);
  const [txStatus, setTxStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [txHash, setTxHash] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !publicKey) {
      toast.error('Please connect your wallet first.');
      return;
    }

    if (!recipient || !amount) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error('Please enter a valid amount.');
      return;
    }

    try {
      setLoading(true);
      setTxStatus('idle');
      setTxHash('');
      setErrorMsg('');

      const res = await stellar.sendXlmTransaction(publicKey, recipient, amount);

      setTxStatus('success');
      setTxHash(res.hash);
      toast.success('Transaction submitted successfully!');
      
      setRecipient('');
      setAmount('');
      setMemo('');
      
      await refreshBalance();
    } catch (err: unknown) {
      setTxStatus('error');
      const msg = err instanceof Error ? err.message : 'Transaction failed';
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Direct XLM Payment</h1>
        <p className="text-slate-500 text-sm">Send instant Stellar Testnet payments with real-time balance checks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Form */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <div className="tonal-layer p-6 rounded-xl border border-slate-200 bg-slate-50">
            {!isConnected ? (
              <div className="text-center py-12 bg-white rounded-lg border border-slate-200 p-6">
                <span className="material-symbols-outlined text-4xl text-slate-400 mb-3">account_balance_wallet</span>
                <p className="text-sm text-slate-600 font-semibold">
                  Please connect your wallet using the button in the top right to start transfers.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTransfer} className="flex flex-col gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest" htmlFor="address">
                    Recipient Address (G...)
                  </label>
                  <div className="relative">
                    <input
                      id="address"
                      type="text"
                      placeholder="e.g. GCFN...3CKA"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      disabled={loading}
                      required
                      className="w-full h-12 bg-white border border-slate-200 rounded-lg px-4 text-slate-900 outline-none active-ring focus:border-black transition-all"
                    />
                    <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400">contact_page</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest" htmlFor="amount">
                      Amount (XLM)
                    </label>
                    <div className="relative">
                      <input
                        id="amount"
                        type="number"
                        step="0.0000001"
                        min="0.0000001"
                        placeholder="10.0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        disabled={loading}
                        required
                        className="w-full h-12 bg-white border border-slate-200 rounded-lg px-4 text-slate-900 outline-none active-ring focus:border-black transition-all"
                      />
                      <span className="absolute right-4 top-3 text-xs font-bold text-slate-400">XLM</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Current Balance
                    </label>
                    <div className="h-12 flex items-center px-4 bg-slate-200/50 rounded-lg border border-transparent">
                      <span className="font-semibold text-slate-900 text-sm">{balance} XLM</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest" htmlFor="memo">
                    Memo (Optional)
                  </label>
                  <input
                    id="memo"
                    type="text"
                    placeholder="Internal Reference ID"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    disabled={loading}
                    className="w-full h-12 bg-white border border-slate-200 rounded-lg px-4 text-slate-900 outline-none active-ring focus:border-black transition-all"
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
                      Processing...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">send</span>
                      Send XLM Payment
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Success Dialog */}
          {txStatus === 'success' && txHash && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-[#D1FAE5] p-5 rounded-xl border border-emerald-200 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-white">check_circle</span>
                  </div>
                  <div>
                    <p className="font-bold text-emerald-900 text-sm">Transaction Broadcasted</p>
                    <p className="text-emerald-700 text-xs mt-0.5">Your payment is being processed on the Stellar Network.</p>
                  </div>
                </div>
                <div className="mt-2 pt-3 border-t border-emerald-200/50">
                  <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest mb-1">Transaction Hash</p>
                  <div className="flex items-center justify-between bg-white/70 rounded p-2 border border-emerald-200">
                    <code className="text-xs font-mono text-emerald-950 truncate w-64">{txHash}</code>
                    <a
                      href={stellar.getExplorerLink(txHash, 'tx')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-900 hover:underline text-xs font-bold flex items-center gap-1"
                    >
                      View <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Dialog */}
          {txStatus === 'error' && errorMsg && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-red-50 p-5 rounded-xl border border-red-200 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-white">error</span>
                  </div>
                  <div>
                    <p className="font-bold text-red-900 text-sm">Transaction Failed</p>
                    <p className="text-red-700 text-xs mt-0.5">{errorMsg}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Status info */}
        <div className="md:col-span-5 flex flex-col gap-6">
          {/* Network Integrity */}
          <div className="tonal-layer p-6 rounded-xl border border-slate-200 bg-slate-50">
            <h3 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest">Network Integrity</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Stellar Testnet</span>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                  <span className="font-semibold text-slate-900">Connected</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Validation Speed</span>
                <span className="font-bold text-slate-900">~5.2s</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-black h-full w-[94%]"></div>
              </div>
            </div>
          </div>

          {/* Secure visual card */}
          <div className="relative h-48 rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
            <div className="absolute inset-0 bg-cover bg-center opacity-40"
                 style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAH6ktHQ1PeV8wdE7sJ9xUB6iWF6Y4OwqBec2oid6NQl7Unh6vAK8kQBMvEuctSx_aynPrZR8O7G3e32Py-Uv3bipC_l0o77YAzlBJCiZ4kMNoVKUA8Spc2jX3-JzCZQmeMlDTNj_3Qbm7lm6lQa_Rkvxk6Znf2rm-StVpunMpIueLoOFerGJv4TlwYRMPv2EG1NA26sAYNIJ934FKmrCBGfOpTYV3MiRV89sLMrOCrkltDZzrut3o8Vmw_bnllayLh7UelBb8a-II')` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-5">
              <div className="text-white">
                <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Security Protocol</p>
                <p className="text-lg font-bold mt-1">Hardware Encrypted Ledger</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
