import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface UIContextValue {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  quickViewId: string | null;
  openQuickView: (id: string | null) => void;
  bookingOpen: boolean;
  setBookingOpen: (open: boolean) => void;
  selectedBookingService: string | null;
  openBookingModal: (serviceId?: string) => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quickViewId, openQuickView] = useState<string | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedBookingService, setSelectedBookingService] = useState<string | null>(null);

  const openBookingModal = (serviceId?: string) => {
    if (serviceId) setSelectedBookingService(serviceId);
    setBookingOpen(true);
  };

  const value = useMemo(
    () => ({
      searchOpen,
      setSearchOpen,
      menuOpen,
      setMenuOpen,
      quickViewId,
      openQuickView,
      bookingOpen,
      setBookingOpen,
      selectedBookingService,
      openBookingModal,
    }),
    [searchOpen, menuOpen, quickViewId, bookingOpen, selectedBookingService],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI debe usarse dentro de <UIProvider>");
  return ctx;
}

