import { FiActivity } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <FiActivity className="h-4 w-4 text-slate-800" />
          <span>ChainTrace — Trustless Trade & Supply Chain Tracking</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span>Built for RiseIn Level 3 — Orange Belt</span>
        </div>
      </div>
    </footer>
  );
}
