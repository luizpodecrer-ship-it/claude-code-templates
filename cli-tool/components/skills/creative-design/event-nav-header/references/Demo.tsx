import React from 'react';
// Uses Variant A. For Variant B: import EventNavHeader from './EventNavHeaderZeroDep';
import EventNavHeader from './EventNavHeader';

// Page-level wrapper: the gradient backdrop and hero typography belong to the page, not the header.
export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-rose-300 to-indigo-300 flex flex-col justify-between">
      <EventNavHeader className="relative" />
      <main className="text-center py-24">
        <h1 className="text-8xl font-black text-white tracking-tight">Unfold</h1>
        <p className="text-white/80 text-sm mt-4 font-mono">Volume 06 • 30.04 - 2025</p>
      </main>
      <div className="h-12" />
    </div>
  );
}
