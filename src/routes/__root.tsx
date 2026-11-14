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
      { name: "theme-color", content: "#0f766e" },
      { title: "OdontoGuía — Capacitación y Procesos Clínicos" },
      { name: "description", content: "Plataforma de capacitación y estandarización de procesos para personal nuevo de clínica dental." },
      { property: "og:site_name", content: "OdontoGuía" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Plus+Jakarta+Sans:wght@600;700&family=Public+Sans:wght@400;500;600&display=swap",
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
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-teal-700 selection:text-white">
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
      <Outlet />
      <Toaster position="bottom-center" />
    </QueryClientProvider>
  );
}
