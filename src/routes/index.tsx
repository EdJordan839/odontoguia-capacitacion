import { createFileRoute } from "@tanstack/react-router";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { FeaturedProduct } from "@/components/home/FeaturedProduct";
import { Hero } from "@/components/home/Hero";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { SpacesExplorer } from "@/components/home/SpacesExplorer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Casa Veta — Mobiliario de nogal, parota y roble hecho en México" },
      {
        name: "description",
        content:
          "Mesas, sillas, consolas y objetos decorativos de madera maciza. Elige tu madera y medidas. Envío e instalación con garantía de 5 años.",
      },
      { property: "og:title", content: "Casa Veta — Mobiliario de madera maciza" },
      {
        property: "og:description",
        content: "Piezas de nogal, parota y roble diseñadas y fabricadas a mano en talleres mexicanos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <SpacesExplorer />
      <FeaturedProduct />
      <BrandMarquee />
      <ProductShowcase />
    </>
  );
}
