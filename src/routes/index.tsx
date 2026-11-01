import { createFileRoute } from "@tanstack/react-router";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { ConsultantFeature } from "@/components/home/ConsultantFeature";
import { FeaturedProduct } from "@/components/home/FeaturedProduct";
import { Hero } from "@/components/home/Hero";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { SpacesExplorer } from "@/components/home/SpacesExplorer";
import { StatsCounter } from "@/components/home/StatsCounter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YES I'AM — Consultoría de Imagen & Marca Personal" },
      {
        name: "description",
        content:
          "YES I'AM — Consultoría de Imagen y Marca Personal en Chihuahua y global. Asesoría ejecutiva de imagen pública, estilismo, oratoria y dirección de arte editorial.",
      },
      { property: "og:title", content: "YES I'AM — Consultoría de Imagen & Marca Personal" },
      {
        property: "og:description",
        content: "Donde tu presencia se convierte en autoridad y tu marca en legado. Asesorías VIP presenciales y digitales.",
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
      <BrandMarquee />
      <FeaturedProduct />
      <ProductShowcase />
      <StatsCounter />
      <ConsultantFeature />
    </>
  );
}
