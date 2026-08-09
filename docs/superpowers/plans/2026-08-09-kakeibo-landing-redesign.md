# Diário Financeiro Kakeibo — Landing Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current static HTML/CSS institutional home page with a single, premium, animated sales landing page for the "Diário Financeiro Kakeibo" (R$ 9,90), built with Vite + React + TypeScript + Tailwind + shadcn/ui primitives + Motion, while keeping the Política de Privacidade as a separate page and preserving the current color palette exactly.

**Architecture:** Vite multi-page build with two HTML entry points (`index.html` → sales landing page, `politica-de-privacidade/index.html` → privacy policy), no client router. Each entry mounts its own React tree. Tailwind v4 (via `@tailwindcss/vite`) defines the color/typography tokens once in `src/index.css`; shadcn-style UI primitives are hand-written in `src/components/ui/` (no network calls to a registry at build time). Landing page sections are one component each under `src/components/sections/`, composed in `App.tsx`, animated with Motion's `whileInView` reveals via two shared wrapper components (`Reveal`, `StaggerList`/`StaggerItem`).

**Tech Stack:** Vite 6, React 18, TypeScript, Tailwind CSS v4, Radix UI primitives (`@radix-ui/react-accordion`, `-checkbox`, `-label`, `-slot`), `class-variance-authority`, `lucide-react`, `motion` (motion.dev), Vitest + React Testing Library.

**Registry sourcing note:** the spec asked for components from originkit.dev/templates, skiper-ui.com and cult-ui.com. Only `cult-ui.com` panned out as a free, verifiable source (public MIT-licensed registry at `github.com/nolly-studio/cult-ui`) — `originkit.dev`'s catalog turned out to be flashy particle/glitter effects requiring a signed-up API key, a poor fit for the "acolhedor" tone, and `skiper-ui.com` could not be confirmed as free (paid Premium/Exclusive tiers). Two real cult-ui components are ported below, recolored to the locked palette: `minimal-card` (card wrapper) and `neumorph-eyebrow` (pill badge). `texture-button`'s nested-div structure is incompatible with the `asChild`/Radix `Slot` pattern our CTAs need (they must render as real `<a>` links, not `<button>`, for accessibility/no-JS fallback) — Task 3's `Button` instead borrows its layered-gradient-depth *look* as a single-element implementation.

## Global Constraints

- Color palette must match exactly: `ink #173c35`, `muted #567068`, `paper #f8f5ed`, `mint #d9eadf`, `green #2f6758`, `gold #c4a86a`, `line rgba(23,60,53,.16)`. No new colors.
- Single page, no navigation menu, continuous scroll — sections in this exact order: Hero → Reconhecimento da dor → Agitação → Solução → Oferta → Captura de e-mail → Prova social → Garantia → FAQ → CTA final → Rodapé.
- Price is R$ 9,90, single payment, no order bump, no upsell.
- Never show an inflated/invented reference price (e.g. "de R$X por R$9,90").
- Never promise a specific financial outcome (income, debt payoff, etc.) — only clarity and completing the first cycle.
- Guarantee text must state exactly 7 days and reference CDC art. 49 accurately.
- All landing-page copy is verbatim from the approved spec (`docs/superpowers/specs/2026-08-09-kakeibo-landing-redesign-design.md`) — no rewriting.
- Product images and the Kirvano checkout link are intentionally not available yet — use clearly marked placeholders (`ImagePlaceholder` component, `href="#"` + `TODO: link Kirvano` comment) instead of inventing content.
- Política de Privacidade stays a separate route/page (legally required + explicitly required by the spec's footer).
- All animations must respect `prefers-reduced-motion`.

---

## Task 1: Project scaffolding (Vite + React + TS + Tailwind v4 + Vitest)

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `src/index.css`
- Create: `src/test/setup.ts`
- Create: `src/App.tsx` (temporary placeholder, replaced in Task 15)
- Create: `src/main.tsx`
- Create: `.gitignore`

**Interfaces:**
- Produces: `App` component (default export replaced later), Tailwind color utilities `bg-ink`/`text-ink`/`bg-green`/`text-green`/`bg-gold`/`text-gold`/`bg-mint`/`bg-paper`/`border-line`/`text-muted`, font utilities via `--font-display` (Fraunces) and `--font-sans` (Inter), path alias `@/*` → `src/*`.

- [ ] **Step 1: Create a feature branch**

Run: `git checkout -b redesign/kakeibo-premium-landing`
Expected: branch created and checked out, based on current `main` (which already has the design spec commit).

- [ ] **Step 2: Write `.gitignore`**

```
node_modules
dist
.DS_Store
```

- [ ] **Step 3: Write `package.json`**

```json
{
  "name": "planeja-leve-financas-site",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "motion": "^11.15.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.5",
    "class-variance-authority": "^0.7.1",
    "lucide-react": "^0.468.0",
    "@radix-ui/react-accordion": "^1.2.2",
    "@radix-ui/react-checkbox": "^1.1.3",
    "@radix-ui/react-label": "^2.1.1",
    "@radix-ui/react-slot": "^1.1.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "^5.7.2",
    "vite": "^6.0.5",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "vitest": "^2.1.8",
    "@testing-library/react": "^16.1.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/user-event": "^14.5.2",
    "jsdom": "^25.0.1",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@types/node": "^22.10.5"
  }
}
```

- [ ] **Step 4: Install dependencies**

Run: `npm install`
Expected: `node_modules/` created, `package-lock.json` generated, no errors.

- [ ] **Step 5: Write `tsconfig.node.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "Bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 6: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 7: Write `vite.config.ts`**

```ts
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "node:path"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        privacy: path.resolve(__dirname, "politica-de-privacidade/index.html"),
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
  },
})
```

- [ ] **Step 8: Write `src/test/setup.ts`**

Includes an `IntersectionObserver` mock: `motion`'s `whileInView` (used by the `Reveal`/`StaggerList` primitives in Task 2, and by nearly every section from Task 4 onward) requires it, and jsdom does not implement it — omitting this makes every test for a section using those primitives crash with `ReferenceError: IntersectionObserver is not defined`.

```ts
import "@testing-library/jest-dom/vitest"

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null
  readonly rootMargin: string = ""
  readonly thresholds: ReadonlyArray<number> = []
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver

// Radix's Checkbox (useSize) requires ResizeObserver, which jsdom does not implement either —
// surfaces later, in Task 9's EmailCapture test, once a real Checkbox is rendered.
class MockResizeObserver implements ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver
```

- [ ] **Step 9: Write `src/index.css` with the exact current palette as Tailwind v4 tokens**

```css
@import "tailwindcss";

@theme {
  --font-display: "Fraunces", ui-serif, Georgia, serif;
  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;

  --color-ink: #173c35;
  --color-muted: #567068;
  --color-paper: #f8f5ed;
  --color-mint: #d9eadf;
  --color-green: #2f6758;
  --color-gold: #c4a86a;
  --color-line: rgb(23 60 53 / 0.16);

  --animate-accordion-down: accordion-down 0.2s ease-out;
  --animate-accordion-up: accordion-up 0.2s ease-out;
}

@keyframes accordion-down {
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
}

@keyframes accordion-up {
  from {
    height: var(--radix-accordion-content-height);
  }
  to {
    height: 0;
  }
}

body {
  margin: 0;
  background:
    radial-gradient(circle at 85% 8%, rgb(217 234 223 / 0.9), transparent 28rem),
    var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
}

html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 10: Write a temporary placeholder `src/App.tsx` (replaced fully in Task 15)**

```tsx
export function App() {
  return <main className="p-10 text-ink">Planeja Leve Finanças</main>
}
```

- [ ] **Step 11: Write `src/main.tsx`**

```tsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

- [ ] **Step 12: Update root `index.html` to mount the new entry (keep existing meta/OG/canonical/favicon tags, add font links)**

Replace the `<body>` and add font preconnect/links in `<head>`, keeping every existing `<meta>`, `<link rel="canonical">` and `<link rel="icon">` tag as-is:

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Diário Financeiro Kakeibo | Planeja Leve Finanças</title>
    <meta name="description" content="O método japonês de 30 dias pra sair do piloto automático financeiro. Sem app, sem conectar conta bancária.">
    <meta property="og:title" content="Diário Financeiro Kakeibo | Planeja Leve Finanças">
    <meta property="og:description" content="O método japonês de 30 dias pra sair do piloto automático financeiro.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://planejaleve.netlify.app/">
    <meta property="og:image" content="https://planejaleve.netlify.app/og.png">
    <link rel="canonical" href="https://planejaleve.netlify.app/">
    <link rel="icon" href="/planeja-leve.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,680&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 13: Verify the dev server and a production build both work**

Run: `npm run dev` (start, confirm it serves on localhost, then stop it)
Run: `npm run build`
Expected: build completes with no TypeScript or Vite errors, `dist/index.html` and `dist/assets/*` are generated.

- [ ] **Step 14: Commit**

```bash
git add package.json package-lock.json tsconfig.json tsconfig.node.json vite.config.ts src/index.css src/test/setup.ts src/App.tsx src/main.tsx index.html .gitignore
git commit -m "Scaffold Vite + React + Tailwind v4 + Vitest project"
```

---

## Task 2: Shared layout & motion primitives

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/lib/motion-variants.ts`
- Create: `src/components/Container.tsx`
- Create: `src/components/ImagePlaceholder.tsx`
- Create: `src/components/ImagePlaceholder.test.tsx`
- Create: `src/components/Reveal.tsx`
- Create: `src/components/Stagger.tsx`

**Interfaces:**
- Consumes: nothing from Task 1 besides the Tailwind tokens (`bg-mint`, `border-gold`, `text-muted`, etc.) and path alias `@/*`.
- Produces: `cn(...inputs: ClassValue[]): string` from `@/lib/utils`; `fadeSlideUp: Variants` and `staggerContainer: Variants` from `@/lib/motion-variants`; `Container({ children, className? })`; `ImagePlaceholder({ label, aspect?: "portrait" | "square", className? })`; `Reveal({ children, className? })`; `StaggerList({ children, className? })` and `StaggerItem({ children, className? })` from `@/components/Stagger`.

- [ ] **Step 1: Write `src/lib/utils.ts`**

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 2: Write `src/lib/motion-variants.ts`**

```ts
import type { Variants } from "motion/react"

export const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}
```

- [ ] **Step 3: Write `src/components/Container.tsx`**

```tsx
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn("mx-auto w-[min(1180px,calc(100%-40px))]", className)}>{children}</div>
}
```

- [ ] **Step 4: Write the failing test for `ImagePlaceholder`**

```tsx
// src/components/ImagePlaceholder.test.tsx
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { ImagePlaceholder } from "./ImagePlaceholder"

describe("ImagePlaceholder", () => {
  it("exposes the label as the accessible name of the image placeholder", () => {
    render(<ImagePlaceholder label="Capa do Diário Financeiro Kakeibo" />)
    expect(
      screen.getByRole("img", { name: "Capa do Diário Financeiro Kakeibo" })
    ).toBeInTheDocument()
  })
})
```

- [ ] **Step 5: Run the test to verify it fails**

Run: `npx vitest run src/components/ImagePlaceholder.test.tsx`
Expected: FAIL — `Failed to resolve import "./ImagePlaceholder"`.

- [ ] **Step 6: Write `src/components/ImagePlaceholder.tsx`**

```tsx
import { cn } from "@/lib/utils"

export function ImagePlaceholder({
  label,
  aspect = "portrait",
  className,
}: {
  label: string
  aspect?: "portrait" | "square"
  className?: string
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        aspect === "portrait" ? "aspect-[3/4]" : "aspect-square",
        "flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gold/60 bg-mint/40 p-4 text-center text-muted",
        className
      )}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5-11 11" />
      </svg>
      <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
    </div>
  )
}
```

- [ ] **Step 7: Run the test to verify it passes**

Run: `npx vitest run src/components/ImagePlaceholder.test.tsx`
Expected: PASS.

- [ ] **Step 8: Write `src/components/Reveal.tsx`**

```tsx
import type { ReactNode } from "react"
import { motion } from "motion/react"
import { fadeSlideUp } from "@/lib/motion-variants"

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={fadeSlideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 9: Write `src/components/Stagger.tsx`**

```tsx
import type { ReactNode } from "react"
import { motion } from "motion/react"
import { fadeSlideUp, staggerContainer } from "@/lib/motion-variants"

export function StaggerList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.ul
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.ul>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.li className={className} variants={fadeSlideUp}>
      {children}
    </motion.li>
  )
}
```

- [ ] **Step 10: Run the full test suite**

Run: `npm run test`
Expected: PASS (1 test file, 1 test).

- [ ] **Step 11: Commit**

```bash
git add src/lib/utils.ts src/lib/motion-variants.ts src/components/Container.tsx src/components/ImagePlaceholder.tsx src/components/ImagePlaceholder.test.tsx src/components/Reveal.tsx src/components/Stagger.tsx
git commit -m "Add shared layout and motion primitives"
```

---

## Task 3: UI primitives — hand-written (Button, Input, Label, Checkbox, Accordion) + adapted from cult-ui.com (MinimalCard, NeumorphEyebrow)

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/button.test.tsx`
- Create: `src/components/ui/input.tsx`
- Create: `src/components/ui/label.tsx`
- Create: `src/components/ui/checkbox.tsx`
- Create: `src/components/ui/checkbox.test.tsx`
- Create: `src/components/ui/accordion.tsx`
- Create: `src/components/ui/accordion.test.tsx`
- Create: `src/components/ui/minimal-card.tsx`
- Create: `src/components/ui/minimal-card.test.tsx`
- Create: `src/components/ui/neumorph-eyebrow.tsx`
- Create: `src/components/ui/neumorph-eyebrow.test.tsx`

**Interfaces:**
- Consumes: `cn` from `@/lib/utils` (Task 2).
- Produces: `Button` (props: standard `<button>` attrs + `variant?: "default" | "outline"`, `size?: "default" | "lg"`, `asChild?: boolean`), `buttonVariants`; `Input` (standard `<input>` attrs); `Label` (Radix label props); `Checkbox` (Radix checkbox props: `id`, `name`, `required`, `defaultChecked`, etc.); `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` (Radix accordion props); `MinimalCard` (standard `<div>` attrs); `NeumorphEyebrow({ children, className? })`.

- [ ] **Step 1: Write the failing test for `Button`**

```tsx
// src/components/ui/button.test.tsx
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { Button } from "./button"

describe("Button", () => {
  it("renders as the wrapped anchor when asChild is set, instead of a nested button", () => {
    render(
      <Button asChild>
        <a href="#oferta">Quero organizar minhas finanças</a>
      </Button>
    )
    const link = screen.getByRole("link", { name: /quero organizar minhas finanças/i })
    expect(link).toHaveAttribute("href", "#oferta")
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/components/ui/button.test.tsx`
Expected: FAIL — `Failed to resolve import "./button"`.

- [ ] **Step 3: Write `src/components/ui/button.tsx`**

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Layered gradient + inset-highlight depth inspired by cult-ui.com's texture-button (MIT),
// reimplemented as a single element so Radix Slot can correctly hoist an `asChild` <a>.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-b text-sm font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_1px_2px_rgba(23,60,53,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_6px_14px_rgba(23,60,53,0.3)] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "from-green to-[#20493d] text-white",
        outline: "border border-line from-white/60 to-white/60 text-ink shadow-none hover:shadow-none",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        lg: "h-[52px] px-7 py-3.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run src/components/ui/button.test.tsx`
Expected: PASS.

- [ ] **Step 5: Write `src/components/ui/input.tsx`**

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border border-line bg-white/80 px-4 text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
Input.displayName = "Input"

export { Input }
```

- [ ] **Step 6: Write `src/components/ui/label.tsx`**

```tsx
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cn } from "@/lib/utils"

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn("text-sm font-medium leading-none text-ink", className)} {...props} />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
```

- [ ] **Step 7: Write the failing test for `Checkbox`**

```tsx
// src/components/ui/checkbox.test.tsx
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Checkbox } from "./checkbox"

describe("Checkbox", () => {
  it("toggles checked state and syncs a hidden native input with the given name for static form submission", async () => {
    const user = userEvent.setup()
    render(<Checkbox id="consent" name="consentimento" required />)
    const box = screen.getByRole("checkbox")
    expect(box).not.toBeChecked()
    await user.click(box)
    expect(box).toBeChecked()
  })
})
```

- [ ] **Step 8: Run it to verify it fails**

Run: `npx vitest run src/components/ui/checkbox.test.tsx`
Expected: FAIL — `Failed to resolve import "./checkbox"`.

- [ ] **Step 9: Write `src/components/ui/checkbox.tsx`**

```tsx
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-line bg-white data-[state=checked]:border-green data-[state=checked]:bg-green data-[state=checked]:text-white",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="h-3.5 w-3.5" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
```

- [ ] **Step 10: Run it to verify it passes**

Run: `npx vitest run src/components/ui/checkbox.test.tsx`
Expected: PASS.

- [ ] **Step 11: Write the failing test for `Accordion`**

```tsx
// src/components/ui/accordion.test.tsx
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion"

describe("Accordion", () => {
  it("marks the trigger expanded and reveals the answer only after its question is clicked", async () => {
    const user = userEvent.setup()
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Recebo na hora?</AccordionTrigger>
          <AccordionContent>Sim, acesso imediato após a confirmação do pagamento.</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    const trigger = screen.getByRole("button", { name: /recebo na hora\?/i })
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    await user.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByText(/acesso imediato/i)).toBeInTheDocument()
  })
})
```

Note: `toBeVisible()` can't be used here — the closed/open visual state is driven purely by a CSS keyframe animation (`animate-accordion-up`/`-down`), which jsdom doesn't execute, so it would report the content as visible even when closed. `aria-expanded` is the real, DOM-testable signal Radix maintains regardless of CSS.

- [ ] **Step 12: Run it to verify it fails**

Run: `npx vitest run src/components/ui/accordion.test.tsx`
Expected: FAIL — `Failed to resolve import "./accordion"`.

- [ ] **Step 13: Write `src/components/ui/accordion.tsx`**

```tsx
import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b border-line", className)} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-5 text-left font-medium transition-all [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 text-muted transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-5 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
```

- [ ] **Step 14: Run it to verify it passes**

Run: `npx vitest run src/components/ui/accordion.test.tsx`
Expected: PASS.

- [ ] **Step 15: Write the failing test for `MinimalCard`**

```tsx
// src/components/ui/minimal-card.test.tsx
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { MinimalCard } from "./minimal-card"

describe("MinimalCard", () => {
  it("renders its children inside a rounded card wrapper", () => {
    render(<MinimalCard>Já perdeu as contas de quanto gastou esse mês?</MinimalCard>)
    expect(screen.getByText(/já perdeu as contas/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 16: Run it to verify it fails**

Run: `npx vitest run src/components/ui/minimal-card.test.tsx`
Expected: FAIL — `Failed to resolve import "./minimal-card"`.

- [ ] **Step 17: Write `src/components/ui/minimal-card.tsx`**

Adapted from cult-ui.com's `minimal-card` (MIT license, github.com/nolly-studio/cult-ui): dropped the unused `next/image` import (the original component already renders a plain `<img>` internally and never uses the `Image` it imports) and the `MinimalCardImage`/`Title`/`Description`/`Content`/`Footer` sub-components we don't need (YAGNI — we only use the base card as a text wrapper), and recolored every `neutral-*` shade to the project's `ink`/`paper`/`line` tokens.

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const MinimalCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[24px] border border-line bg-white/70 p-5 shadow-sm transition-colors hover:bg-white",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
MinimalCard.displayName = "MinimalCard"

export { MinimalCard }
```

- [ ] **Step 18: Run it to verify it passes**

Run: `npx vitest run src/components/ui/minimal-card.test.tsx`
Expected: PASS.

- [ ] **Step 19: Write the failing test for `NeumorphEyebrow`**

```tsx
// src/components/ui/neumorph-eyebrow.test.tsx
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { NeumorphEyebrow } from "./neumorph-eyebrow"

describe("NeumorphEyebrow", () => {
  it("renders its label text inside a pill badge", () => {
    render(<NeumorphEyebrow>Método Kakeibo</NeumorphEyebrow>)
    expect(screen.getByText("Método Kakeibo")).toBeInTheDocument()
  })
})
```

- [ ] **Step 20: Run it to verify it fails**

Run: `npx vitest run src/components/ui/neumorph-eyebrow.test.tsx`
Expected: FAIL — `Failed to resolve import "./neumorph-eyebrow"`.

- [ ] **Step 21: Write `src/components/ui/neumorph-eyebrow.tsx`**

Adapted from cult-ui.com's `neumorph-eyebrow` (MIT license, github.com/nolly-studio/cult-ui): dropped the `intent` color-variant system (`primary`/`secondary` used blue/green shades outside the locked palette) and recolored the default variant's border/text/shadow to the project's `gold`/`ink`/`paper` tokens.

```tsx
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function NeumorphEyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex h-6 w-fit items-center rounded-full border border-gold/70 bg-paper px-2.5 font-mono text-xs font-semibold uppercase tracking-wide text-[#6d5b31] shadow-[inset_0px_-2px_0px_0px_rgba(196,168,106,0.15),0px_1px_6px_0px_rgba(196,168,106,0.15)]",
        className
      )}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 22: Run it to verify it passes**

Run: `npx vitest run src/components/ui/neumorph-eyebrow.test.tsx`
Expected: PASS.

- [ ] **Step 23: Run the full test suite and commit**

Run: `npm run test`
Expected: PASS (all test files so far green).

```bash
git add src/components/ui
git commit -m "Add UI primitives: hand-written form/accordion + cult-ui-adapted card and eyebrow"
```

---

## Task 4: Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Create: `src/components/sections/Hero.test.tsx`

**Interfaces:**
- Consumes: `Container`, `ImagePlaceholder` (Task 2), `Button`, `NeumorphEyebrow` (Task 3), `motion` from `motion/react`.
- Produces: `Hero()` component, rendering a `<section id="hero">`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/sections/Hero.test.tsx
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { Hero } from "./Hero"

describe("Hero", () => {
  it("renders the headline, subheadline and a CTA linking to the offer section", () => {
    render(<Hero />)
    expect(
      screen.getByRole("heading", { level: 1, name: /kakeibo: o método japonês de 30 dias/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/sem conectar sua conta bancária a nada/i)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /quero organizar minhas finanças/i })).toHaveAttribute(
      "href",
      "#oferta"
    )
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/components/sections/Hero.test.tsx`
Expected: FAIL — `Failed to resolve import "./Hero"`.

- [ ] **Step 3: Write `src/components/sections/Hero.tsx`**

```tsx
import { motion } from "motion/react"
import { Container } from "@/components/Container"
import { ImagePlaceholder } from "@/components/ImagePlaceholder"
import { Button } from "@/components/ui/button"
import { NeumorphEyebrow } from "@/components/ui/neumorph-eyebrow"

export function Hero() {
  return (
    <section id="hero" className="border-b border-line pb-20 pt-24 md:pb-28 md:pt-32">
      <Container className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <NeumorphEyebrow>Método Kakeibo</NeumorphEyebrow>
          <h1 className="mt-7 font-display text-[clamp(38px,6vw,68px)] leading-[1.02] tracking-tight text-ink">
            Kakeibo: o método japonês de 30 dias pra sair do piloto automático financeiro
          </h1>
          <p className="mt-6 max-w-[520px] text-lg leading-relaxed text-muted md:text-xl">
            Sem conectar sua conta bancária a nada. Sem mais um app pra abandonar em uma semana.
          </p>
          <Button asChild size="lg" className="mt-9">
            <a href="#oferta">Quero organizar minhas finanças</a>
          </Button>
        </motion.div>
        <ImagePlaceholder label="Capa do Diário Financeiro Kakeibo" />
      </Container>
    </section>
  )
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run src/components/sections/Hero.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Hero.tsx src/components/sections/Hero.test.tsx
git commit -m "Add Hero section"
```

---

## Task 5: Reconhecimento da dor section

**Files:**
- Create: `src/components/sections/PainRecognition.tsx`
- Create: `src/components/sections/PainRecognition.test.tsx`

**Interfaces:**
- Consumes: `Container`, `Reveal`, `StaggerList`, `StaggerItem` (Task 2), `MinimalCard` (Task 3).
- Produces: `PainRecognition()` component, rendering `<section id="reconhecimento">`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/sections/PainRecognition.test.tsx
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { PainRecognition } from "./PainRecognition"

describe("PainRecognition", () => {
  it("renders all four pain-recognition questions and the closing reassurance line", () => {
    render(<PainRecognition />)
    expect(screen.getByText(/já perdeu as contas de quanto gastou esse mês\?/i)).toBeInTheDocument()
    expect(screen.getByText(/o dinheiro "some" antes de você perceber\?/i)).toBeInTheDocument()
    expect(screen.getByText(/desinstalou na primeira semana\?/i)).toBeInTheDocument()
    expect(screen.getByText(/abrir o extrato do cartão\?/i)).toBeInTheDocument()
    expect(screen.getByText(/não é falta de força de vontade/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/components/sections/PainRecognition.test.tsx`
Expected: FAIL — `Failed to resolve import "./PainRecognition"`.

- [ ] **Step 3: Write `src/components/sections/PainRecognition.tsx`**

```tsx
import { Container } from "@/components/Container"
import { Reveal } from "@/components/Reveal"
import { StaggerItem, StaggerList } from "@/components/Stagger"
import { MinimalCard } from "@/components/ui/minimal-card"

const QUESTIONS = [
  "Já perdeu as contas de quanto gastou esse mês?",
  'Sente que o dinheiro "some" antes de você perceber?',
  "Já baixou um app de finanças e desinstalou na primeira semana?",
  "Sente um aperto só de pensar em abrir o extrato do cartão?",
]

export function PainRecognition() {
  return (
    <section id="reconhecimento" className="border-b border-line py-20">
      <Container className="max-w-[720px]">
        <StaggerList className="space-y-4">
          {QUESTIONS.map((question) => (
            <StaggerItem key={question}>
              <MinimalCard className="font-display text-xl text-ink md:text-2xl">{question}</MinimalCard>
            </StaggerItem>
          ))}
        </StaggerList>
        <Reveal className="mt-10">
          <p className="text-lg leading-relaxed text-muted">
            Isso não é falta de força de vontade. É falta da ferramenta certa — uma que não exige
            que você vire especialista em planilha.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run src/components/sections/PainRecognition.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/PainRecognition.tsx src/components/sections/PainRecognition.test.tsx
git commit -m "Add pain recognition section"
```

---

## Task 6: Agitação section

**Files:**
- Create: `src/components/sections/Agitation.tsx`
- Create: `src/components/sections/Agitation.test.tsx`

**Interfaces:**
- Consumes: `Container`, `Reveal` (Task 2).
- Produces: `Agitation()` component, rendering `<section id="agitacao">`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/sections/Agitation.test.tsx
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { Agitation } from "./Agitation"

describe("Agitation", () => {
  it("renders the clarity-over-income framing as a blockquote", () => {
    render(<Agitation />)
    expect(screen.getByText(/não é sobre ganhar mais/i)).toBeInTheDocument()
    expect(screen.getByText(/sabendo pra onde o dinheiro está indo/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/components/sections/Agitation.test.tsx`
Expected: FAIL — `Failed to resolve import "./Agitation"`.

- [ ] **Step 3: Write `src/components/sections/Agitation.tsx`**

```tsx
import { Container } from "@/components/Container"
import { Reveal } from "@/components/Reveal"

export function Agitation() {
  return (
    <section id="agitacao" className="border-b border-line bg-mint/40 py-20">
      <Container className="max-w-[820px]">
        <Reveal>
          <blockquote className="border-l-4 border-gold pl-6 font-display text-[clamp(24px,3.4vw,36px)] leading-snug text-ink">
            Não é sobre ganhar mais. É sobre enxergar com clareza — porque toda meta que você adia
            (a viagem, a reserva de emergência, sair do vermelho) começa exatamente aqui: sabendo
            pra onde o dinheiro está indo.
          </blockquote>
        </Reveal>
      </Container>
    </section>
  )
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run src/components/sections/Agitation.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Agitation.tsx src/components/sections/Agitation.test.tsx
git commit -m "Add agitation section"
```

---

## Task 7: Solução section

**Files:**
- Create: `src/components/sections/Solution.tsx`
- Create: `src/components/sections/Solution.test.tsx`

**Interfaces:**
- Consumes: `Container`, `Reveal`, `ImagePlaceholder` (Task 2), `NeumorphEyebrow` (Task 3).
- Produces: `Solution()` component, rendering `<section id="solucao">`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/sections/Solution.test.tsx
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { Solution } from "./Solution"

describe("Solution", () => {
  it("explains what the Kakeibo diary is and shows three product page previews", () => {
    render(<Solution />)
    expect(screen.getByRole("heading", { name: /o que é o diário financeiro kakeibo/i })).toBeInTheDocument()
    expect(screen.getByText(/não é um app, não pede seus dados bancários/i)).toBeInTheDocument()
    expect(screen.getAllByRole("img", { name: /página \d do diário/i })).toHaveLength(3)
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/components/sections/Solution.test.tsx`
Expected: FAIL — `Failed to resolve import "./Solution"`.

- [ ] **Step 3: Write `src/components/sections/Solution.tsx`**

```tsx
import { Container } from "@/components/Container"
import { ImagePlaceholder } from "@/components/ImagePlaceholder"
import { Reveal } from "@/components/Reveal"
import { NeumorphEyebrow } from "@/components/ui/neumorph-eyebrow"

export function Solution() {
  return (
    <section id="solucao" className="border-b border-line py-20">
      <Container className="grid gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <NeumorphEyebrow>O método</NeumorphEyebrow>
          <h2 className="mt-6 font-display text-[clamp(28px,3.6vw,42px)] leading-tight text-ink">
            O que é o Diário Financeiro Kakeibo
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            O Diário Financeiro Kakeibo não é um app, não pede seus dados bancários e não exige
            que você entenda de finanças. É um método japonês com mais de 100 anos que te mostra,
            com clareza, pra onde seu dinheiro está indo — pra você decidir o que fazer com essa
            informação, no seu tempo.
          </p>
        </Reveal>
        <Reveal className="grid grid-cols-3 gap-3">
          <ImagePlaceholder label="Página 1 do Diário" />
          <ImagePlaceholder label="Página 2 do Diário" />
          <ImagePlaceholder label="Página 3 do Diário" />
        </Reveal>
      </Container>
    </section>
  )
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run src/components/sections/Solution.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Solution.tsx src/components/sections/Solution.test.tsx
git commit -m "Add solution section"
```

---

## Task 8: Oferta section

**Files:**
- Create: `src/components/sections/Offer.tsx`
- Create: `src/components/sections/Offer.test.tsx`

**Interfaces:**
- Consumes: `Container`, `StaggerList`, `StaggerItem` (Task 2), `Button`, `MinimalCard` (Task 3), `Check` icon from `lucide-react`.
- Produces: `Offer()` component, rendering `<section id="oferta">` with a CTA link `id="cta-oferta"` and `href="#"` (Kirvano link pending).

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/sections/Offer.test.tsx
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { Offer } from "./Offer"

describe("Offer", () => {
  it("lists all five included items and shows a pending checkout CTA", () => {
    render(<Offer />)
    expect(screen.getByRole("heading", { name: /tudo isso por r\$ 9,90/i })).toBeInTheDocument()
    expect(screen.getByText(/diário financeiro kakeibo completo/i)).toBeInTheDocument()
    expect(screen.getByText(/versão para imprimir e versão digital preenchível/i)).toBeInTheDocument()
    expect(screen.getByText(/raio-x dos gastos invisíveis/i)).toBeInTheDocument()
    expect(screen.getByText(/desafio de 30 dias para economizar/i)).toBeInTheDocument()
    expect(screen.getByText(/bônus também em 2 formatos/i)).toBeInTheDocument()
    const cta = screen.getByRole("link", { name: /quero meu diário kakeibo/i })
    expect(cta).toHaveAttribute("href", "#")
    expect(cta).toHaveAttribute("id", "cta-oferta")
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/components/sections/Offer.test.tsx`
Expected: FAIL — `Failed to resolve import "./Offer"`.

- [ ] **Step 3: Write `src/components/sections/Offer.tsx`**

```tsx
import { Check } from "lucide-react"
import { Container } from "@/components/Container"
import { StaggerItem, StaggerList } from "@/components/Stagger"
import { Button } from "@/components/ui/button"
import { MinimalCard } from "@/components/ui/minimal-card"

const ITEMS = [
  "Diário Financeiro Kakeibo completo (guia + fichas de planejamento, registro e resumo)",
  "Versão para imprimir E versão digital preenchível",
  "Bônus: Raio-X dos Gastos Invisíveis",
  "Bônus: Desafio de 30 Dias para Economizar (meta em percentual, adaptável a qualquer renda)",
  "Bônus também em 2 formatos (imprimir e digital)",
]

export function Offer() {
  return (
    <section id="oferta" className="border-b border-line py-20">
      <Container className="max-w-[720px] text-center">
        <h2 className="font-display text-[clamp(30px,4vw,46px)] text-ink">Tudo isso por R$ 9,90</h2>
        <StaggerList className="mt-10 space-y-3 text-left">
          {ITEMS.map((item) => (
            <StaggerItem key={item}>
              <MinimalCard className="flex items-start gap-3">
                <Check className="mt-1 h-5 w-5 shrink-0 text-green" aria-hidden="true" />
                <span className="text-muted">{item}</span>
              </MinimalCard>
            </StaggerItem>
          ))}
        </StaggerList>
        <Button asChild size="lg" className="mt-10">
          {/* TODO: link Kirvano */}
          <a href="#" id="cta-oferta">
            Quero meu Diário Kakeibo por R$ 9,90
          </a>
        </Button>
      </Container>
    </section>
  )
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run src/components/sections/Offer.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Offer.tsx src/components/sections/Offer.test.tsx
git commit -m "Add offer section"
```

---

## Task 9: Captura de e-mail section

**Files:**
- Create: `src/components/sections/EmailCapture.tsx`
- Create: `src/components/sections/EmailCapture.test.tsx`

**Interfaces:**
- Consumes: `Container`, `Reveal` (Task 2), `Button`, `Input`, `Label`, `Checkbox` (Task 3).
- Produces: `EmailCapture()` component, rendering `<section id="newsletter">` containing a `<form name="newsletter">`.
- **Note for Task 15:** this React-rendered form will NOT be detected by Netlify's build-time form parser (it only scans static HTML, and this SPA's `dist/index.html` has no form markup until React mounts). Task 15 adds a hidden static replica of this exact form (same `name`, field `name`s, and honeypot) directly in `index.html` so Netlify provisions the `newsletter` form endpoint.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/sections/EmailCapture.test.tsx
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { EmailCapture } from "./EmailCapture"

describe("EmailCapture", () => {
  it("renders a required email input and a required LGPD consent checkbox linking to the privacy policy", () => {
    render(<EmailCapture />)
    expect(screen.getByText(/quer receber novidades e conteúdo extra/i)).toBeInTheDocument()

    const emailInput = screen.getByLabelText(/e-mail/i)
    expect(emailInput).toHaveAttribute("type", "email")
    expect(emailInput).toBeRequired()

    const consent = screen.getByRole("checkbox")
    expect(consent).toBeRequired()

    expect(screen.getByRole("link", { name: /política de privacidade/i })).toHaveAttribute(
      "href",
      "/politica-de-privacidade/"
    )

    const form = document.querySelector("form[name='newsletter']")
    expect(form).toHaveAttribute("data-netlify", "true")
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/components/sections/EmailCapture.test.tsx`
Expected: FAIL — `Failed to resolve import "./EmailCapture"`.

- [ ] **Step 3: Write `src/components/sections/EmailCapture.tsx`**

```tsx
import { Container } from "@/components/Container"
import { Reveal } from "@/components/Reveal"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function EmailCapture() {
  return (
    <section id="newsletter" className="border-b border-line bg-mint/30 py-16">
      <Container className="max-w-[560px] text-center">
        <Reveal>
          <p className="text-lg text-ink">
            Quer receber novidades e conteúdo extra sobre organização financeira? Deixe seu e-mail
          </p>
          <form
            name="newsletter"
            method="POST"
            data-netlify="true"
            netlify-honeypot="empresa"
            className="mt-6 space-y-4 text-left"
          >
            <input type="hidden" name="form-name" value="newsletter" />
            <div className="hidden">
              <label>
                Não preencha este campo
                <input name="empresa" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newsletter-email">E-mail</Label>
              <Input id="newsletter-email" name="email" type="email" required placeholder="seu@email.com" />
            </div>
            <div className="flex items-start gap-3">
              <Checkbox id="newsletter-consent" name="consentimento" required />
              <Label htmlFor="newsletter-consent" className="text-sm font-normal text-muted">
                Concordo em receber comunicações da Planeja Leve Finanças e li a{" "}
                <a href="/politica-de-privacidade/" className="text-green underline underline-offset-2">
                  Política de Privacidade
                </a>
                .
              </Label>
            </div>
            <Button type="submit" className="w-full">
              Quero receber
            </Button>
          </form>
        </Reveal>
      </Container>
    </section>
  )
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run src/components/sections/EmailCapture.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/EmailCapture.tsx src/components/sections/EmailCapture.test.tsx
git commit -m "Add email capture section"
```

---

## Task 10: Prova social section

**Files:**
- Create: `src/components/sections/SocialProof.tsx`
- Create: `src/components/sections/SocialProof.test.tsx`

**Interfaces:**
- Consumes: `Container`, `Reveal` (Task 2), `ShieldCheck` icon from `lucide-react`.
- Produces: `SocialProof()` component, rendering `<section id="confianca">`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/sections/SocialProof.test.tsx
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { SocialProof } from "./SocialProof"

describe("SocialProof", () => {
  it("shows the secure payment badge and the method transparency note", () => {
    render(<SocialProof />)
    expect(screen.getByText(/pagamento processado com segurança/i)).toBeInTheDocument()
    expect(screen.getByText(/método japonês centenário/i)).toBeInTheDocument()
    expect(screen.getByText(/hani motoko em 1904/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/components/sections/SocialProof.test.tsx`
Expected: FAIL — `Failed to resolve import "./SocialProof"`.

- [ ] **Step 3: Write `src/components/sections/SocialProof.tsx`**

```tsx
import { ShieldCheck } from "lucide-react"
import { Container } from "@/components/Container"
import { Reveal } from "@/components/Reveal"

export function SocialProof() {
  return (
    <section id="confianca" className="border-b border-line py-16">
      <Container className="flex flex-col items-center gap-4 text-center">
        <Reveal className="flex items-center gap-2 rounded-full border border-line bg-white/60 px-4 py-2 text-sm font-medium text-ink">
          <ShieldCheck className="h-4 w-4 text-green" aria-hidden="true" />
          Pagamento processado com segurança
        </Reveal>
        <Reveal className="max-w-[600px] text-sm leading-relaxed text-muted">
          O Kakeibo é um método japonês centenário, criado por Hani Motoko em 1904 — não foi
          inventado por nós. Organizamos o conteúdo em um formato prático pra você aplicar hoje,
          no seu ritmo.
        </Reveal>
      </Container>
    </section>
  )
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run src/components/sections/SocialProof.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/SocialProof.tsx src/components/sections/SocialProof.test.tsx
git commit -m "Add social proof section"
```

---

## Task 11: Garantia section

**Files:**
- Create: `src/components/sections/Guarantee.tsx`
- Create: `src/components/sections/Guarantee.test.tsx`

**Interfaces:**
- Consumes: `Container`, `Reveal` (Task 2), `BadgeCheck` icon from `lucide-react`.
- Produces: `Guarantee()` component, rendering `<section id="garantia">`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/sections/Guarantee.test.tsx
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { Guarantee } from "./Guarantee"

describe("Guarantee", () => {
  it("states the 7-day no-questions-asked guarantee and cites CDC art. 49", () => {
    render(<Guarantee />)
    expect(screen.getByText(/garantia de 7 dias/i)).toBeInTheDocument()
    expect(screen.getByText(/sem perguntas/i)).toBeInTheDocument()
    expect(screen.getByText(/código de defesa do consumidor \(art\. 49\)/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/components/sections/Guarantee.test.tsx`
Expected: FAIL — `Failed to resolve import "./Guarantee"`.

- [ ] **Step 3: Write `src/components/sections/Guarantee.tsx`**

```tsx
import { BadgeCheck } from "lucide-react"
import { Container } from "@/components/Container"
import { Reveal } from "@/components/Reveal"

export function Guarantee() {
  return (
    <section id="garantia" className="border-b border-line bg-mint/30 py-16">
      <Container className="max-w-[680px] text-center">
        <Reveal className="flex flex-col items-center gap-4">
          <BadgeCheck className="h-10 w-10 text-green" aria-hidden="true" />
          <p className="font-display text-2xl text-ink">
            Garantia de 7 dias — se não fizer sentido pra você, devolvemos seu dinheiro, sem
            perguntas.
          </p>
          <p className="text-sm text-muted">
            Conforme o Código de Defesa do Consumidor (art. 49), você tem até 7 dias corridos após
            a compra para desistir e solicitar reembolso integral, sem necessidade de
            justificativa.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run src/components/sections/Guarantee.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Guarantee.tsx src/components/sections/Guarantee.test.tsx
git commit -m "Add guarantee section"
```

---

## Task 12: FAQ section

**Files:**
- Create: `src/components/sections/FAQ.tsx`
- Create: `src/components/sections/FAQ.test.tsx`

**Interfaces:**
- Consumes: `Container`, `Reveal` (Task 2), `Accordion`/`AccordionItem`/`AccordionTrigger`/`AccordionContent` (Task 3).
- Produces: `FAQ()` component, rendering `<section id="faq">`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/sections/FAQ.test.tsx
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { FAQ } from "./FAQ"

describe("FAQ", () => {
  it("renders all five questions and reveals each answer on click", async () => {
    const user = userEvent.setup()
    render(<FAQ />)

    expect(screen.getByRole("button", { name: /preciso entender de finanças pra usar\?/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /por que não usar um app de graça\?/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /funciona no celular ou só impresso\?/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /recebo na hora\?/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /e se eu não gostar\?/i })).toBeInTheDocument()

    const trigger = screen.getByRole("button", { name: /recebo na hora\?/i })
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    await user.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByText(/acesso imediato após a confirmação do pagamento/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/components/sections/FAQ.test.tsx`
Expected: FAIL — `Failed to resolve import "./FAQ"`.

- [ ] **Step 3: Write `src/components/sections/FAQ.tsx`**

```tsx
import { Container } from "@/components/Container"
import { Reveal } from "@/components/Reveal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const FAQS = [
  {
    question: "Preciso entender de finanças pra usar?",
    answer:
      "Não. O material foi feito justamente pra quem nunca organizou nada antes — sem termos técnicos, sem fórmula.",
  },
  {
    question: "Por que não usar um app de graça?",
    answer:
      "Não é sobre ter o app mais completo — é sobre finalmente começar, sem complicação, sem conectar sua conta bancária a nada, sem mais uma senha pra lembrar. Você escreve, vê pra onde seu dinheiro vai, e ajusta.",
  },
  {
    question: "Funciona no celular ou só impresso?",
    answer:
      "Os dois — você recebe a versão pra imprimir e a versão digital preenchível, pra usar direto no celular ou tablet.",
  },
  {
    question: "Recebo na hora?",
    answer: "Sim, acesso imediato após a confirmação do pagamento.",
  },
  {
    question: "E se eu não gostar?",
    answer:
      "Você tem 7 dias de garantia — se não fizer sentido pra você, devolvemos seu dinheiro, sem perguntas.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="border-b border-line py-20">
      <Container className="max-w-[760px]">
        <h2 className="text-center font-display text-[clamp(28px,3.6vw,40px)] text-ink">
          Perguntas frequentes
        </h2>
        <Reveal className="mt-10">
          <Accordion type="single" collapsible>
            {FAQS.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger className="font-display text-lg text-ink">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  )
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run src/components/sections/FAQ.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/FAQ.tsx src/components/sections/FAQ.test.tsx
git commit -m "Add FAQ section"
```

---

## Task 13: CTA final section

**Files:**
- Create: `src/components/sections/FinalCTA.tsx`
- Create: `src/components/sections/FinalCTA.test.tsx`

**Interfaces:**
- Consumes: `Container`, `Reveal` (Task 2), `Button` (Task 3).
- Produces: `FinalCTA()` component, rendering `<section id="cta-final-section">` with a CTA link `id="cta-final"` and `href="#"` (Kirvano link pending).

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/sections/FinalCTA.test.tsx
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { FinalCTA } from "./FinalCTA"

describe("FinalCTA", () => {
  it("repeats a short headline with a centered pending checkout CTA", () => {
    render(<FinalCTA />)
    expect(screen.getByRole("heading", { name: /comece seu kakeibo hoje/i })).toBeInTheDocument()
    const cta = screen.getByRole("link", { name: /quero organizar minhas finanças por r\$ 9,90/i })
    expect(cta).toHaveAttribute("href", "#")
    expect(cta).toHaveAttribute("id", "cta-final")
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/components/sections/FinalCTA.test.tsx`
Expected: FAIL — `Failed to resolve import "./FinalCTA"`.

- [ ] **Step 3: Write `src/components/sections/FinalCTA.tsx`**

```tsx
import { Container } from "@/components/Container"
import { Reveal } from "@/components/Reveal"
import { Button } from "@/components/ui/button"

export function FinalCTA() {
  return (
    <section id="cta-final-section" className="border-b border-line py-20 text-center">
      <Container className="max-w-[640px]">
        <Reveal>
          <h2 className="font-display text-[clamp(30px,4vw,46px)] text-ink">Comece seu Kakeibo hoje</h2>
          <Button asChild size="lg" className="mt-8">
            {/* TODO: link Kirvano */}
            <a href="#" id="cta-final">
              Quero organizar minhas finanças por R$ 9,90
            </a>
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run src/components/sections/FinalCTA.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/FinalCTA.tsx src/components/sections/FinalCTA.test.tsx
git commit -m "Add final CTA section"
```

---

## Task 14: Footer

**Files:**
- Create: `src/components/sections/Footer.tsx`
- Create: `src/components/sections/Footer.test.tsx`

**Interfaces:**
- Consumes: `Container` (Task 2).
- Produces: `Footer()` component, rendering `<footer>`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/sections/Footer.test.tsx
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { Footer } from "./Footer"

describe("Footer", () => {
  it("shows the brand, a link to the privacy policy, and the educational-content disclaimer", () => {
    render(<Footer />)
    expect(screen.getByText(/© 2026 planeja leve finanças/i)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /política de privacidade/i })).toHaveAttribute(
      "href",
      "/politica-de-privacidade/"
    )
    expect(screen.getByText(/não constitui aconselhamento financeiro/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/components/sections/Footer.test.tsx`
Expected: FAIL — `Failed to resolve import "./Footer"`.

- [ ] **Step 3: Write `src/components/sections/Footer.tsx`**

```tsx
import { Container } from "@/components/Container"

export function Footer() {
  return (
    <footer className="py-10 text-sm text-muted">
      <Container className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
        <span>© 2026 Planeja Leve Finanças</span>
        <nav className="flex flex-wrap items-center justify-center gap-4">
          <a href="/politica-de-privacidade/" className="underline underline-offset-2 hover:text-ink">
            Política de Privacidade
          </a>
          <a
            href="https://br.pinterest.com/planejalevefinancas/"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-ink"
          >
            Fale conosco no Pinterest
          </a>
        </nav>
        <span>Conteúdo educativo — não constitui aconselhamento financeiro.</span>
      </Container>
    </footer>
  )
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run src/components/sections/Footer.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Footer.tsx src/components/sections/Footer.test.tsx
git commit -m "Add footer"
```

---

## Task 15: Compose the full landing page, wire the entry point, add the static Netlify Forms replica

**Files:**
- Modify: `src/App.tsx`
- Create: `src/App.test.tsx`
- Modify: `index.html`

**Interfaces:**
- Consumes: `Hero`, `PainRecognition`, `Agitation`, `Solution`, `Offer`, `EmailCapture`, `SocialProof`, `Guarantee`, `FAQ`, `FinalCTA`, `Footer` (Tasks 4–14), `MotionConfig` from `motion/react`.
- Produces: `App()` — the full composed landing page, imported by `main.tsx` (already wired in Task 1).

- [ ] **Step 1: Write the failing test**

```tsx
// src/App.test.tsx
import { describe, expect, it } from "vitest"
import { render } from "@testing-library/react"
import { App } from "./App"

describe("App", () => {
  it("renders every landing page section in the required order", () => {
    const { container } = render(<App />)
    const sectionIds = Array.from(container.querySelectorAll("section")).map((section) => section.id)
    expect(sectionIds).toEqual([
      "hero",
      "reconhecimento",
      "agitacao",
      "solucao",
      "oferta",
      "newsletter",
      "confianca",
      "garantia",
      "faq",
      "cta-final-section",
    ])
    expect(container.querySelector("footer")).not.toBeNull()
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/App.test.tsx`
Expected: FAIL — the placeholder `App` from Task 1 renders a `<main>` with no `<section>` elements, so `sectionIds` is `[]`.

- [ ] **Step 3: Replace `src/App.tsx` with the full composition**

```tsx
import { MotionConfig } from "motion/react"
import { Agitation } from "@/components/sections/Agitation"
import { EmailCapture } from "@/components/sections/EmailCapture"
import { FAQ } from "@/components/sections/FAQ"
import { FinalCTA } from "@/components/sections/FinalCTA"
import { Footer } from "@/components/sections/Footer"
import { Guarantee } from "@/components/sections/Guarantee"
import { Hero } from "@/components/sections/Hero"
import { Offer } from "@/components/sections/Offer"
import { PainRecognition } from "@/components/sections/PainRecognition"
import { SocialProof } from "@/components/sections/SocialProof"
import { Solution } from "@/components/sections/Solution"

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <Hero />
        <PainRecognition />
        <Agitation />
        <Solution />
        <Offer />
        <EmailCapture />
        <SocialProof />
        <Guarantee />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </MotionConfig>
  )
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run src/App.test.tsx`
Expected: PASS.

- [ ] **Step 5: Add the hidden static form replica to `index.html` so Netlify's build-time crawler detects it**

Netlify Forms is detected by scanning the static HTML produced at build time. Because `EmailCapture`'s form only exists in the DOM after React mounts, Netlify's bot never sees it. Add this hidden, JS-free replica right after the opening `<body>` tag, before `<div id="root">`, with the exact same `name`, field `name`s and honeypot as `EmailCapture.tsx`:

```html
<body>
  <form name="newsletter" data-netlify="true" netlify-honeypot="empresa" hidden>
    <input type="email" name="email" />
    <input type="checkbox" name="consentimento" />
    <input name="empresa" />
  </form>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
```

- [ ] **Step 6: Verify the production build still succeeds and run the full test suite**

Run: `npm run build`
Expected: no errors, `dist/index.html` includes the hidden `newsletter` form.

Run: `npm run test`
Expected: PASS (all test files green).

- [ ] **Step 7: Commit**

```bash
git add src/App.tsx src/App.test.tsx index.html
git commit -m "Compose the full Kakeibo landing page and wire Netlify Forms detection"
```

---

## Task 16: Redesign the Política de Privacidade page

**Files:**
- Create: `src/PrivacyPage.tsx`
- Create: `src/PrivacyPage.test.tsx`
- Create: `src/privacy-main.tsx`
- Modify: `politica-de-privacidade/index.html`

**Interfaces:**
- Consumes: `Container` (Task 2).
- Produces: `PrivacyPage()` component, mounted by `privacy-main.tsx` into `politica-de-privacidade/index.html`'s `#root`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/PrivacyPage.test.tsx
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { PrivacyPage } from "./PrivacyPage"

describe("PrivacyPage", () => {
  it("covers the Kakeibo sales page's three personal-data touchpoints: email opt-in, Kirvano payment, and the Pinterest integration", () => {
    render(<PrivacyPage />)
    expect(screen.getByRole("heading", { level: 1, name: /política de privacidade/i })).toBeInTheDocument()
    expect(screen.getAllByText(/kirvano/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/consentimento/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/api do pinterest/i).length).toBeGreaterThan(0)
    expect(screen.getByRole("link", { name: /voltar ao início/i })).toHaveAttribute("href", "/")
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run src/PrivacyPage.test.tsx`
Expected: FAIL — `Failed to resolve import "./PrivacyPage"`.

- [ ] **Step 3: Write `src/PrivacyPage.tsx`**

```tsx
import { Container } from "@/components/Container"

export function PrivacyPage() {
  return (
    <main>
      <Container className="max-w-[820px] py-20">
        <span className="w-fit rounded-full border border-gold px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wide text-[#6d5b31]">
          Transparência
        </span>
        <h1 className="mt-6 font-display text-[clamp(38px,6vw,64px)] text-ink">Política de Privacidade</h1>
        <p className="mt-2 font-mono text-xs text-muted">Última atualização: 9 de agosto de 2026</p>

        <div className="mt-12 space-y-10 text-muted [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-ink [&_li]:mt-2 [&_p]:leading-relaxed">
          <section>
            <h2>1. Quem somos e o que este site faz</h2>
            <p>
              Este site é operado pela Planeja Leve Finanças e é uma página única de vendas do
              Diário Financeiro Kakeibo. Ele também mantém uma integração privada de uso interno
              com a API do Pinterest e um formulário opcional de captura de e-mail.
            </p>
          </section>

          <section>
            <h2>2. Dados que coletamos</h2>
            <ul>
              <li>E-mail: apenas se você preencher voluntariamente o formulário de novidades.</li>
              <li>
                Dados de pagamento: processados inteiramente pelo Kirvano no momento da compra do
                Diário Financeiro Kakeibo.
              </li>
              <li>
                Dados da integração com a API do Pinterest: informações básicas da conta, Pins e
                pastas necessários para administrar exclusivamente a conta da Planeja Leve
                Finanças.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Compra e processamento de pagamento (Kirvano)</h2>
            <p>
              O checkout do Diário Financeiro Kakeibo é processado pelo Kirvano. Não armazenamos
              dados de cartão ou de pagamento em nossos próprios sistemas — essas informações
              ficam exclusivamente com o Kirvano, responsável pelo processamento seguro da
              transação.
            </p>
          </section>

          <section>
            <h2>4. E-mail e consentimento (LGPD)</h2>
            <p>
              Só enviamos e-mails com novidades e conteúdo sobre organização financeira para quem
              marcar o checkbox de consentimento no formulário. Você pode revogar esse
              consentimento a qualquer momento, pelo link de descadastro presente em cada e-mail
              enviado.
            </p>
          </section>

          <section>
            <h2>5. Integração com o Pinterest</h2>
            <p>
              A integração auxilia na criação e programação de Pins previamente selecionados pelo
              titular e na consulta dos próprios Pins e pastas. Não solicitamos nem armazenamos a
              senha do Pinterest e não acessamos contas de terceiros. Nenhum dado recebido da API
              é vendido ou compartilhado com terceiros.
            </p>
          </section>

          <section>
            <h2>6. Armazenamento e segurança</h2>
            <p>
              Não mantemos cópias permanentes de dados de Pins ou pastas obtidos pela API. As
              credenciais de acesso são mantidas em ambiente privado, com acesso restrito ao
              titular.
            </p>
          </section>

          <section>
            <h2>7. Seus direitos (LGPD)</h2>
            <p>
              Você pode solicitar acesso, correção ou exclusão do seu e-mail em nossa lista, e
              revogar seu consentimento a qualquer momento, entrando em contato pelo canal
              indicado abaixo.
            </p>
          </section>

          <section>
            <h2>8. Contato</h2>
            <p>
              Dúvidas sobre esta política podem ser encaminhadas pelo perfil público{" "}
              <a
                href="https://br.pinterest.com/planejalevefinancas/"
                target="_blank"
                rel="noreferrer"
                className="text-green underline underline-offset-2"
              >
                @planejalevefinancas
              </a>
              .
            </p>
          </section>

          <section>
            <h2>9. Alterações</h2>
            <p>
              Esta política poderá ser atualizada para refletir mudanças no site, na oferta ou nas
              regras aplicáveis. A data da revisão mais recente permanece indicada no início desta
              página.
            </p>
          </section>
        </div>

        <a href="/" className="mt-16 inline-block text-green underline underline-offset-2">
          Voltar ao início
        </a>
      </Container>
    </main>
  )
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run src/PrivacyPage.test.tsx`
Expected: PASS.

- [ ] **Step 5: Write `src/privacy-main.tsx`**

```tsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { PrivacyPage } from "./PrivacyPage"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrivacyPage />
  </StrictMode>
)
```

- [ ] **Step 6: Update `politica-de-privacidade/index.html`**

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Política de Privacidade | Planeja Leve Finanças</title>
    <meta name="description" content="Política de Privacidade da Planeja Leve Finanças: dados de e-mail, pagamento via Kirvano e integração com a API do Pinterest.">
    <link rel="canonical" href="https://planejaleve.netlify.app/politica-de-privacidade/">
    <link rel="icon" href="/planeja-leve.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,680&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/privacy-main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Run the full test suite and verify the build**

Run: `npm run test`
Expected: PASS (all test files green).

Run: `npm run build`
Expected: `dist/index.html` and `dist/politica-de-privacidade/index.html` are both generated.

- [ ] **Step 8: Commit**

```bash
git add src/PrivacyPage.tsx src/PrivacyPage.test.tsx src/privacy-main.tsx politica-de-privacidade/index.html
git commit -m "Redesign the privacy policy page and expand it for email/Kirvano data"
```

---

## Task 17: Update Netlify build configuration

**Files:**
- Modify: `netlify.toml`

**Interfaces:**
- Consumes: `dist/` output produced by `npm run build` (Task 1's `vite.config.ts` multi-page build).

- [ ] **Step 1: Update `netlify.toml` to build the Vite project instead of publishing the raw repo**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    X-Frame-Options = "DENY"
```

- [ ] **Step 2: Verify a clean install + build matches what Netlify will run**

Run: `rm -rf node_modules dist && npm install && npm run build`
Expected: succeeds, `dist/index.html` and `dist/politica-de-privacidade/index.html` exist, `dist/og.png` and `dist/planeja-leve.png` are present (Vite copies `public/` assets automatically — see Step 3 if they're missing).

- [ ] **Step 3: If `og.png` / `planeja-leve.png` are missing from `dist/`, move them into a `public/` directory**

Vite only auto-copies static assets that live under `public/`. Run:

```bash
mkdir -p public
git mv og.png public/og.png
git mv planeja-leve.png public/planeja-leve.png
```

Re-run `npm run build` and confirm both files now appear in `dist/`.

- [ ] **Step 4: Commit**

```bash
git add netlify.toml public
git commit -m "Point Netlify at the Vite build output"
```

---

## Task 18: Update README

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: nothing (documentation only).

- [ ] **Step 1: Read the current `README.md` and rewrite it to document the new stack**

Replace its content with:

```markdown
# Planeja Leve Finanças — Diário Financeiro Kakeibo

Landing page de vendas de página única para o Diário Financeiro Kakeibo (R$ 9,90),
construída com Vite + React + TypeScript + Tailwind CSS v4 + shadcn-style UI
primitives + Motion.

## Páginas

- `/` — landing page de vendas (Hero, reconhecimento da dor, agitação, solução,
  oferta, captura de e-mail, prova social, garantia, FAQ, CTA final, rodapé).
- `/politica-de-privacidade/` — Política de Privacidade (e-mail/LGPD, pagamento
  via Kirvano, integração com a API do Pinterest).

## Desenvolvimento

```bash
npm install
npm run dev      # servidor local
npm run test     # testes (Vitest + Testing Library)
npm run build    # build de produção em dist/
```

## Deploy

Netlify roda `npm run build` e publica `dist/` (ver `netlify.toml`).

## Pendências conhecidas

- Imagens reais do produto (capa do Diário + 2 bônus + páginas internas) — hoje
  são placeholders (`ImagePlaceholder`).
- Link de checkout do Kirvano — os botões de compra (`#cta-oferta`, `#cta-final`)
  estão com `href="#"` e um comentário `TODO: link Kirvano`.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "Document the new stack and known pending items in the README"
```

---

## Task 19: Manual visual QA

**Files:** none (verification only).

- [ ] **Step 1: Start the dev server**

Run: `npm run dev` (leave it running in the background)

- [ ] **Step 2: Load the site in a browser and check every section renders in order, uses the correct palette, and the FAQ accordion opens/closes**

Use the `webapp-testing` skill (Playwright) or a manual browser check against `http://localhost:5173/` and `http://localhost:5173/politica-de-privacidade/`. Capture a desktop (1280px) and mobile (390px) screenshot of both pages.

- [ ] **Step 3: Verify reduced-motion behavior**

In the browser devtools, enable "Emulate CSS prefers-reduced-motion: reduce" (Chrome DevTools → Rendering tab), reload, and confirm section reveal animations no longer animate (content still appears, just without motion) — `MotionConfig reducedMotion="user"` handles this automatically.

- [ ] **Step 4: Stop the dev server**

Run: stop the background `npm run dev` process.

No commit for this task — it is a verification checkpoint only.

---

## Task 20: Push branch and open a pull request

**Files:** none (git/GitHub operations only).

- [ ] **Step 1: Push the branch**

Run: `git push -u origin redesign/kakeibo-premium-landing`

- [ ] **Step 2: Open a pull request**

```bash
gh pr create \
  --repo faralaster/planeja-leve-financas-site \
  --title "Redesign: landing de vendas premium do Diário Financeiro Kakeibo" \
  --body "$(cat <<'EOF'
## Resumo
- Substitui a home estática (HTML/CSS puro) por uma landing page de vendas única do Diário Financeiro Kakeibo, migrada para Vite + React + TypeScript + Tailwind v4 + Motion.
- Paleta de cores preservada exatamente (ink/muted/paper/mint/green/gold/line).
- Política de Privacidade mantida como página separada, expandida para cobrir e-mail (LGPD) e pagamento via Kirvano.
- Segue a spec em docs/superpowers/specs/2026-08-09-kakeibo-landing-redesign-design.md e o plano em docs/superpowers/plans/2026-08-09-kakeibo-landing-redesign.md.

## Pendências (fora do escopo desta PR)
- Imagens reais do produto — hoje são placeholders (`ImagePlaceholder`).
- Link de checkout Kirvano — botões `#cta-oferta`/`#cta-final` com `href="#"` e `TODO: link Kirvano`.

## Test plan
- [x] `npm run test` — suíte completa verde.
- [x] `npm run build` — gera `dist/index.html` e `dist/politica-de-privacidade/index.html`.
- [x] QA visual manual (desktop 1280px / mobile 390px) nas duas páginas.
- [x] `prefers-reduced-motion` verificado no DevTools.
EOF
)"
```

- [ ] **Step 3: Comment on and close the superseded draft PR #1**

The old draft (branch `claude/como-criar-site-vgjx8z`) split the site into `/` (institutional) and kept Kakeibo separate — that scope was replaced by this single-page redesign.

```bash
gh pr comment 1 --repo faralaster/planeja-leve-financas-site --body "Substituída por #<new-pr-number> — o escopo mudou para uma única landing page de vendas do Kakeibo (sem divisão /sobre)."
gh pr close 1 --repo faralaster/planeja-leve-financas-site
```

Replace `<new-pr-number>` with the number returned by Step 2 before running this.

No further commit — this task only pushes and opens/closes GitHub PRs.
