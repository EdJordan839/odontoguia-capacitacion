import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface UIContextValue {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  quickViewId: string | null;
  openQuickView: (id: string | null) => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quickViewId, openQuickView] = useState<string | null>(null);
  const value = useMemo(
    () => ({ searchOpen, setSearchOpen, menuOpen, setMenuOpen, quickViewId, openQuickView }),
    [searchOpen, menuOpen, quickViewId],
  );
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI debe usarse dentro de <UIProvider>");
  return ctx;
}
