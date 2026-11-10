'use client';

// Variant B: zero dependencies (React + Tailwind only).
import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface EventNavHeaderProps {
  brandName?: string;
  brandHref?: string;
  items?: NavItem[];
  ctaLabel?: string;
  onCtaClick?: () => void;
  className?: string;
}

const DEFAULT_ITEMS: NavItem[] = [
  { id: 'speakers', label: 'Speakers', href: '#speakers' },
  { id: 'agenda', label: 'Agenda', href: '#agenda' },
  { id: 'venue', label: 'Venue', href: '#venue' },
  { id: 'partners', label: 'Partners', href: '#partners' },
  { id: 'awards', label: 'Awards', href: '#awards' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
];

export default function EventNavHeaderZeroDep({
  brandName = 'MEWS',
  brandHref = '#',
  items = DEFAULT_ITEMS,
  ctaLabel = 'Register for 2026',
  onCtaClick,
  className = '',
}: EventNavHeaderProps) {
  return (
    <header
      className={`w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-50 ${className}`}
    >
      <a
        href={brandHref}
        className="text-white/90 hover:text-white font-bold tracking-widest text-sm uppercase whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
      >
        {brandName}
      </a>

      <nav aria-label="Main Navigation" className="flex items-center gap-6">
        <ul className="hidden md:flex items-center gap-5 list-none m-0 p-0">
          {items.map((item) => (
            <li key={item.id} className="relative group">
              <a
                href={item.href}
                className="relative block py-1 text-xs tracking-wide font-medium whitespace-nowrap text-white/70 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white/80 rounded-full transition-all duration-200 ease-out motion-reduce:transition-none group-hover:w-full group-focus-within:w-full"
                />
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onCtaClick}
          style={{ transform: 'translateZ(0)' }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/40 bg-white/10 hover:bg-white/20 text-white text-xs font-medium tracking-wide whitespace-nowrap backdrop-blur-sm transition-all duration-150 hover:scale-105 active:scale-95 motion-reduce:transition-colors motion-reduce:hover:scale-100 motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <span>{ctaLabel}</span>
          <svg
            aria-hidden="true"
            className="w-3.5 h-3.5 opacity-80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </button>
      </nav>
    </header>
  );
}
