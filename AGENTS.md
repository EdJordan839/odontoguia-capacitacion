# Project rules

- The app is OdontoGuía (dental clinic training), imported from github.com/EdJordan839/cursosclinica; its code lives in `src/odontoguia/` and is mounted by `src/routes/index.tsx`; why: keeps imported code isolated from the TanStack shell.
- localStorage is read only inside `useEffect` after hydration (with a `loaded` flag before writing); why: SSR and first client render must match and saved data must not be overwritten by defaults.
- Images are imported as ES modules from `src/assets/odontoguia/`, never `/src/...` string paths; why: string paths break in the published build.
- Never add a root `index.html`, `src/main.tsx` or `src/App.tsx` (SPA entry files); why: the published build serves that blank shell instead of the TanStack Start app.
