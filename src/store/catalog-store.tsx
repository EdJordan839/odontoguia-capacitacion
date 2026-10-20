import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { CATALOG_VERSION, SEED_CATALOG, type Catalog, type Product, type Space } from "@/data/catalog";

const STORAGE_KEY = "casaveta.catalog.v1";

interface CatalogContextValue {
  catalog: Catalog;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  updateSpace: (id: string, patch: Partial<Space>) => void;
  addSpace: (space: Space) => void;
  removeSpace: (id: string) => void;
  setFeaturedProductId: (id: string) => void;
  resetCatalog: () => void;
}

const CatalogContext = createContext<CatalogContextValue | null>(null);

function readStored(): Catalog | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Catalog;
    if (parsed?.version !== CATALOG_VERSION || !Array.isArray(parsed.products)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function CatalogProvider({ children }: { children: ReactNode }) {
  // El servidor y el primer render del cliente usan la semilla; lo guardado
  // se aplica tras hidratar para evitar diferencias de marcado.
  const [catalog, setCatalog] = useState<Catalog>(SEED_CATALOG);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = readStored();
    if (stored) setCatalog(stored);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(catalog));
    } catch {
      /* almacenamiento lleno o bloqueado (Safari privado) */
    }
  }, [catalog, loaded]);

  const updateProduct = useCallback((id: string, patch: Partial<Product>) => {
    setCatalog((c) => ({ ...c, products: c.products.map((p) => (p.id === id ? { ...p, ...patch } : p)) }));
  }, []);
  const addProduct = useCallback((product: Product) => {
    setCatalog((c) => ({ ...c, products: [...c.products, product] }));
  }, []);
  const removeProduct = useCallback((id: string) => {
    setCatalog((c) => ({ ...c, products: c.products.filter((p) => p.id !== id) }));
  }, []);
  const updateSpace = useCallback((id: string, patch: Partial<Space>) => {
    setCatalog((c) => ({ ...c, spaces: c.spaces.map((s) => (s.id === id ? { ...s, ...patch } : s)) }));
  }, []);
  const addSpace = useCallback((space: Space) => {
    setCatalog((c) => ({ ...c, spaces: [...c.spaces, space] }));
  }, []);
  const removeSpace = useCallback((id: string) => {
    setCatalog((c) => ({ ...c, spaces: c.spaces.filter((s) => s.id !== id) }));
  }, []);
  const setFeaturedProductId = useCallback((id: string) => {
    setCatalog((c) => ({ ...c, featuredProductId: id }));
  }, []);
  const resetCatalog = useCallback(() => setCatalog(SEED_CATALOG), []);

  const value = useMemo(
    () => ({ catalog, updateProduct, addProduct, removeProduct, updateSpace, addSpace, removeSpace, setFeaturedProductId, resetCatalog }),
    [catalog, updateProduct, addProduct, removeProduct, updateSpace, addSpace, removeSpace, setFeaturedProductId, resetCatalog],
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog debe usarse dentro de <CatalogProvider>");
  return ctx;
}

export function useProduct(id: string | undefined) {
  const { catalog } = useCatalog();
  return catalog.products.find((p) => p.id === id);
}
