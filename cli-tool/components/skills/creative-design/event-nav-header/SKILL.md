---
name: event-nav-header
description: "Build a minimal event/conference header navigation in React + TypeScript + Tailwind: brand mark on the left, nav links with a sliding underline on hover/focus, and an outlined pill CTA that scales on hover. Ships a framer-motion variant and a zero-dependency CSS variant. Use when: event site header, conference nav bar, landing page top nav, nav link hover underline, pill CTA button, framer-motion layoutId underline."
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Event Navigation Header

A horizontal top navigation bar for event and conference landing pages, drawn over a light pastel or gradient backdrop. The brand mark sits on the left. Nav links ("Speakers", "Agenda", "Venue", "Partners", "Awards", "FAQ") and an outlined pill CTA sit on the right.

- **Link hover/focus:** the link's opacity rises (`text-white/70` → `text-white`) and a 1.5px underline appears. In Variant A the underline slides between links through a shared `layoutId`.
- **CTA pill hover:** the background fill moves from `bg-white/10` to `bg-white/20` and the pill scales up a little (1.03x on a spring in Variant A, 1.05x in CSS in Variant B). It compresses on tap.

The spec was reconstructed from a 0.7 s screen recording (7 frames at 10 fps, 1024 px wide). Nav spacing and opacity transitions are measured. The spring dynamics are inferred, and durations are only accurate to 100 ms steps.

## Files

| File | Use |
| :--- | :--- |
| `references/EventNavHeader.tsx` | **Variant A**: `framer-motion` + `lucide-react`, with a shared-layout sliding underline and a spring CTA |
| `references/EventNavHeaderZeroDep.tsx` | **Variant B**: React + Tailwind only, CSS width-reveal underline, CSS scale on the CTA |
| `references/Demo.tsx` | Example page wrapper with a gradient backdrop and hero copy (imports Variant A; point it at `./EventNavHeaderZeroDep` for Variant B) |

## Workflow: do these in order

1. **Scope boundary:** check what belongs in the component and what belongs in the page (table below).
2. **Mechanism:** keep the durations and opacity values listed below.
3. **Environment check:** look in the project's `package.json` and Tailwind setup.
4. **Implement:** copy Variant A or Variant B into the project's components folder and adapt the imports.
5. **Verify:** run the acceptance checks and go through the failure modes.

### Scope boundary

| Belongs in this component | Belongs in the page |
| :--- | :--- |
| Logo / brand text | Global background mesh / 3D canvas |
| Nav item list with hover transitions | Main hero typography and dates |
| Floating CTA action button | Routing logic and page transitions |

Content is passed in through props (`brandName`, `brandHref`, `items`, `ctaLabel`, `onCtaClick`, `className`).

### Environment check

| Check | If yes | If no |
| :--- | :--- | :--- |
| `framer-motion` installed (or installable)? | Variant A (`npm install framer-motion@^11 lucide-react`) | Variant B |
| `@/lib/utils` exports `cn`? | You may swap the template literals for `cn(...)` | Keep the template literals |
| Tailwind CSS (>= 3) present? | Use the utility classes as written | Translate them to a CSS module or inline styles |
| Next.js App Router / RSC? | Keep `'use client'` at the top | `'use client'` is harmless and can stay |

## Mechanism

- **Link hover state:** an opacity raise plus an underline reveal, about 150-200 ms, ease-out (`[0.16, 1, 0.3, 1]`, 0.2 s).
- **CTA pill hover:** the background fill shifts and the pill scales on a spring (`stiffness: 400, damping: 30`): 1.03x on hover and 0.97x on tap.
- **Variant A underline:** one `motion.span` with `layoutId="nav-underline"` is rendered under the hovered or focused link, so framer-motion animates it from link to link. The hover state is cleared on the `<ul>`'s `onMouseLeave`, so moving the pointer between links does not unmount and remount the underline (no flicker).
- **Variant B underline:** a `w-0` span grows to `w-full` on `group-hover` / `group-focus-within`.

### Invariants

- Nav links keep the same layout size while hovered: only color, opacity and an absolutely positioned underline change. Font size and padding never animate.
- Keyboard focus shows a `focus-visible` ring on the brand, every link and the CTA, and also shows the underline. Nothing depends on pointer hover alone.
- `prefers-reduced-motion`: Variant A swaps the sliding underline for a static one and drops the CTA scale. Variant B removes the width transition and the scale through the `motion-reduce:` variants.

## Data contract

```typescript
export interface NavItem {
  id: string;    // Unique key identifier (also the React key)
  label: string; // 1-2 words displayed text
  href: string;  // Anchor link target
}
```

| Input state | Result |
| :--- | :--- |
| `items = []` | Renders the brand and the CTA with an empty nav-link section |
| `items.length > 8` | May wrap on tablet screens; adjust the breakpoint at which the list is hidden |
| Duplicate `id` | React key collisions and a glitchy underline animation |

## Usage

```tsx
<EventNavHeader
  className="fixed top-0 inset-x-0"
  brandName="ACME CONF"
  items={[
    { id: 'speakers', label: 'Speakers', href: '#speakers' },
    { id: 'agenda', label: 'Agenda', href: '#agenda' },
    { id: 'tickets', label: 'Tickets', href: '/tickets' },
  ]}
  ctaLabel="Get tickets"
  onCtaClick={() => router.push('/register')}
/>
```

The defaults (`'MEWS'`, the six items, `'Register for 2026'`) are demo placeholders: replace them with the real event's content.

## Props

| Prop | Type | Default | Range | Effect |
| :--- | :--- | :--- | :--- | :--- |
| `brandName` | `string` | `'MEWS'` | 1-20 chars | Logo label |
| `brandHref` | `string` | `'#'` | Valid URI | Logo destination |
| `items` | `NavItem[]` | `DEFAULT_ITEMS` | 1-8 items | Navigation item list |
| `ctaLabel` | `string` | `'Register for 2026'` | 1-4 words | Button text |
| `onCtaClick` | `() => void` | `undefined` | Function | CTA click handler |
| `className` | `string` | `''` | CSS class string | Additional container styles (e.g. `fixed top-0 inset-x-0`) |

## Placement

Put the header at the top of the hero or page container, with `relative` or `fixed` positioning passed in through `className` (it already has `z-50`). The text is white, so the parent background needs enough contrast. Check it with a contrast tool when the backdrop is a light pastel.

## Acceptance checks

1. The brand and the CTA render cleanly, with no layout shift.
2. Hovering each nav item reveals the underline smoothly (about 150-200 ms).
3. The underline moves between items without flickering.
4. The CTA scales on hover (1.03x in Variant A) and compresses slightly on tap (0.97x).
5. Tab moves focus through the brand, every link and the button, and each shows a visible focus ring.
6. With reduced motion on, there is no sliding underline and no scale transform.
7. On mobile the links are hidden below `md` and nothing overflows the container.
8. The console shows no hydration or React layout warnings.

## Failure modes

| Symptom | Cause | Fix |
| :--- | :--- | :--- |
| The underline glitches when the pointer moves fast | A `layoutId` collision (two headers on one page) or a missing key | Use unique item ids; wrap each header in `<LayoutGroup id="...">` when there are several |
| The scaled button looks blurry on low-DPI screens | Browser GPU rasterization | `transform: translateZ(0)` is already applied; keep it |
| Items wrap onto two lines on desktop | Too much padding or long labels | Keep `whitespace-nowrap`; limit the container's max-width or shorten the labels |

## Do not

- Animate font sizes or padding on hover (it causes reflow).
- Remove the `focus-visible` styles.
- Leave out the unique `id` on any `NavItem`.

## Safe to change

- Typography sizes, tracking and font families.
- Padding, margins and the max-width of the container.
- Colors and the background blur opacity.

## Re-test after changing

- `layoutId="nav-underline"` (the shared underline transition depends on it).
- The spring parameters (`stiffness: 400, damping: 30`).

## Known gaps

- The source clip does not show a mobile drawer or hamburger menu. Below `md` the links are simply hidden, so add a disclosure menu if mobile navigation is needed.
- Durations are only accurate to 100 ms steps because the source was extracted at 10 fps.
- The design was reconstructed from a video recording, without the original vector assets.

## Provenance

Reconstructed from a Ripplix prompt sheet ("Agile By Design" clip, component id `event-nav-header`). The sheet's frame image was used only for layout, proportions, spacing and hierarchy. The behavior is defined by this spec.
