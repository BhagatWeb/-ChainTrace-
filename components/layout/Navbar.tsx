'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiActivity } from 'react-icons/fi';
import WalletButton from '../wallet/WalletButton';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/transfer', label: 'XLM Direct Transfer' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-cyan-400">
            <FiActivity className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Chain<span className="text-cyan-400 font-semibold">Trace</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-900/65 hover:text-cyan-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Wallet action (desktop) */}
        <div className="hidden md:block">
          <WalletButton />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-slate-900 px-4 py-4 md:hidden animate-slide-up">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-900/60 hover:text-cyan-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 border-t border-slate-900 pt-4">
            <WalletButton />
          </div>
        </div>
      )}
    </header>
  );
}
