import { createFileRoute } from "@tanstack/react-router";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { FeaturedProduct } from "@/components/home/FeaturedProduct";
import { Hero } from "@/components/home/Hero";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { SpacesExplorer } from "@/components/home/SpacesExplorer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NOGARA — CNC · Diseño · Soluciones | Corte Láser y Router" },
      {
        name: "description",
        content:
          "Soluciones en corte router y láser CNC, repisas decorativas paramétricas, reconocimientos de acrílico y cajas parrilleras Grill Box a la medida.",
      },
      { property: "og:title", content: "NOGARA — CNC · Diseño · Soluciones" },
      {
        property: "og:description",
        content: "Corte CNC de alta precisión, diseño paramétrico, reconocimientos corporativos y proyectos a tu medida.",
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
