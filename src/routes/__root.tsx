import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  ScriptOnce,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";
import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobileMenu } from "@/components/site/MobileMenu";
import { SearchDialog } from "@/components/site/SearchDialog";
import { CartDrawer } from "@/components/site/CartDrawer";
import { QuickViewDialog } from "@/components/product/QuickViewDialog";
import { WhatsAppFloatingButton } from "@/components/site/WhatsAppFloatingButton";
import { BookingModal } from "@/components/site/BookingModal";
import { CatalogProvider } from "@/store/catalog-store";
import { CartProvider } from "@/store/cart-store";
import { UIProvider } from "@/store/ui-store";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4 py-24">
      <div className="max-w-md text-center">
        <p className="eyebrow text-parota">Error 404</p>
        <h1 className="mt-3 font-display text-6xl text-foreground">Página no encontrada</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          La página que buscas no existe o fue movida.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl tracking-tight text-foreground">No pudimos cargar esta página</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo salió mal. Intenta de nuevo o vuelve al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Reintentar
          </button>
          <a
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-input bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            Ir al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#111111" },
      { title: "YES I'AM — Consultoría de Imagen & Marca Personal" },
      {
        name: "description",
        content: "Consultoría de imagen ejecutiva, personal branding, estilismo de negocios, oratoria y dirección de arte editorial.",
      },
      { property: "og:site_name", content: "YES I'AM" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Italiana&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es-MX" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {/* Activa las animaciones de revelado sólo cuando hay JS disponible */}
        <ScriptOnce>{`document.documentElement.classList.add('js')`}</ScriptOnce>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CatalogProvider>
        <CartProvider>
          <UIProvider>
            <div className="flex min-h-screen flex-col">
              <a
                href="#contenido"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
              >
                Saltar al contenido
              </a>
              <main id="contenido" className="flex-1">
                {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
                <Outlet />
              </main>
              <SiteFooter />
            </div>
            <MobileMenu />
            <SearchDialog />
            <CartDrawer />
            <QuickViewDialog />
            <BookingModal />
            <WhatsAppFloatingButton />
            <Toaster position="bottom-center" />
          </UIProvider>
        </CartProvider>
      </CatalogProvider>
    </QueryClientProvider>
  );
}
