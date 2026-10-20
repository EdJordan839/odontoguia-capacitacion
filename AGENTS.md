<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules

- Catalog data lives in `src/data/catalog.ts` (types + seed) and is consumed only through `useCatalog()` (`src/store/catalog-store.tsx`); why: the source (seed/localStorage today, Shopify or a backend later) can change without touching UI.
- Catalog records reference images by registry key (`src/data/images.ts`) or absolute URL, never by hashed asset URL; why: persisted localStorage data must survive rebuilds.
- localStorage is read only inside `useEffect` after hydration; why: SSR and first client render must match.
- Scroll animations use the shared IntersectionObserver in `Reveal` plus CSS classes gated by `html.js`, and parallax runs only on fine pointers; why: no scroll-jank on touch, content visible without JS, and `prefers-reduced-motion` disables all motion in `src/styles.css`.
- Viewport-height sections use the `h-hero` / `h-screen-dvh` utilities (vh → svh → dvh fallbacks); why: Safari iOS toolbar resizing.
- Pricing and cart math are pure functions in `src/lib/pricing.ts` and `src/lib/cart.ts`, covered by `src/test/pricing-cart.test.ts`.
