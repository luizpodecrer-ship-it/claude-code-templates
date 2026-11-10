'use client';

// Variant A: framer-motion. Requires: npm install framer-motion lucide-react
import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// ─── Motion Constants ───
// Measured from frames 1-6 (~150-200ms transition bound at 10fps)
const HOVER_TRANSITION = { duration: 0.2, ease: [0.16, 1, 0.3, 1] } as const;
// Do not change without re-testing.
const SPRING_TRANSITION = { type: 'spring', stiffness: 400, damping: 30 } as const;

// ─── Types ───
export interface NavItem {
  id: string; // Unique key identifier
  label: string; // 1-2 words displayed text
  href: string; // Anchor link target
}

export interface EventNavHeaderProps {
  brandName?: string;
  brandHref?: string;
  items?: NavItem[];
  ctaLabel?: string;
  onCtaClick?: () => void;
  className?: string;
}

// ─── Default Data ───
const DEFAULT_ITEMS: NavItem[] = [
  { id: 'speakers', label: 'Speakers', href: '#speakers' },
  { id: 'agenda', label: 'Agenda', href: '#agenda' },
  { id: 'venue', label: 'Venue', href: '#venue' },
  { id: 'partners', label: 'Partners', href: '#partners' },
  { id: 'awards', label: 'Awards', href: '#awards' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
];

const UNDERLINE_CLASS =
  'absolute bottom-0 left-0 right-0 block h-[1.5px] bg-white/80 rounded-full pointer-events-none';

// ─── Component ───
export default function EventNavHeader({
  brandName = 'MEWS',
  brandHref = '#',
  items = DEFAULT_ITEMS,
  ctaLabel = 'Register for 2026',
  onCtaClick,
  className = '',
}: EventNavHeaderProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <header
      className={`w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-50 ${className}`}
    >
      {/* Brand */}
      <a
        href={brandHref}
        className="text-white/90 hover:text-white font-bold tracking-widest text-sm uppercase whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
      >
        {brandName}
      </a>

      {/* Nav Actions */}
      <nav aria-label="Main Navigation" className="flex items-center gap-6">
        <ul
          className="hidden md:flex items-center gap-5 list-none m-0 p-0"
          onMouseLeave={() => setHoveredId(null)}
        >
          {items.map((item) => {
            const isHovered = hoveredId === item.id;
            return (
              <li key={item.id} className="relative">
                <a
                  href={item.href}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onFocus={() => setHoveredId(item.id)}
                  onBlur={() => setHoveredId(null)}
                  className="relative block py-1 text-xs tracking-wide font-medium whitespace-nowrap text-white/70 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
                >
                  {item.label}
                  {/* Subtle underline indicator: slides between items, static under reduced motion */}
                  {isHovered &&
                    (shouldReduceMotion ? (
                      <span aria-hidden="true" className={UNDERLINE_CLASS} />
                    ) : (
                      <motion.span
                        aria-hidden="true"
                        layoutId="nav-underline"
                        className={UNDERLINE_CLASS}
                        transition={HOVER_TRANSITION}
                      />
                    ))}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Action Button */}
        <motion.button
          type="button"
          onClick={onCtaClick}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
          transition={SPRING_TRANSITION}
          style={{ transform: 'translateZ(0)' }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/40 bg-white/10 hover:bg-white/20 text-white text-xs font-medium tracking-wide whitespace-nowrap backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <span>{ctaLabel}</span>
          <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5 opacity-80" />
        </motion.button>
      </nav>
    </header>
  );
}
