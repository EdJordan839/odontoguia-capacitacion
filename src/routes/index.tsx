import { createFileRoute } from "@tanstack/react-router";
import App from "@/odontoguia/App";

const TITLE = "OdontoGuía — Capacitación y Procesos Clínicos";
const DESC =
  "Plataforma de capacitación y estandarización de procesos virtuales y operativos presenciales para personal nuevo de clínica dental.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});
