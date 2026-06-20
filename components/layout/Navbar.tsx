'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';
import WalletButton from '../wallet/WalletButton';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/transfer', label: 'Direct Transfer' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-slate-200 bg-white h-16 flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 text-lg">
          <span className="material-symbols-outlined text-black text-2xl">hub</span>
          <span className="font-extrabold tracking-tight">ChainTrace</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'text-black border-b-2 border-black pb-1'
                    : 'text-slate-500 hover:text-black'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Wallet Connection (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <WalletButton />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-black transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 border-b border-slate-250 px-4 py-4 md:hidden animate-slide-up bg-white z-40 shadow-sm">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-black font-semibold'
                      : 'text-slate-650 hover:bg-slate-50 hover:text-black'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 border-t border-slate-100 pt-4">
            <WalletButton />
          </div>
        </div>
      )}
    </header>
  );
}
