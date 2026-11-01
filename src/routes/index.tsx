import { createFileRoute } from "@tanstack/react-router";
import { ShowitAbout } from "@/components/home/ShowitAbout";
import { ShowitFaq } from "@/components/home/ShowitFaq";
import { ShowitHero } from "@/components/home/ShowitHero";
import { ShowitIdealClient } from "@/components/home/ShowitIdealClient";
import { ShowitInsidePackage } from "@/components/home/ShowitInsidePackage";
import { ShowitInvestment } from "@/components/home/ShowitInvestment";
import { ShowitPaintPicture } from "@/components/home/ShowitPaintPicture";
import { ShowitTopBanner } from "@/components/home/ShowitTopBanner";
import { ShowitVipDark } from "@/components/home/ShowitVipDark";
import { ShowitYouWillGet } from "@/components/home/ShowitYouWillGet";
import { SiteHeader } from "@/components/site/SiteHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YES I'AM — Consultoría de Imagen & Marca Personal" },
      {
        name: "description",
        content:
          "YES I'AM — Consultoría de Imagen y Marca Personal en Chihuahua y global. Asesoría sobria y minimalista de Imagen Ejecutiva, Personal, Pública y para Empresas.",
      },
      { property: "og:title", content: "YES I'AM — Consultoría de Imagen & Marca Personal" },
      {
        property: "og:description",
        content: "Arquitectura de imagen, presencia y liderazgo ejecutivo. Asesorías en Chihuahua y en línea.",
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
      {/* 1. Presentation banner: Showit WEBSITE TEMPLATE */}
      <ShowitTopBanner />

      {/* 2. Hero Section: Woman in black blazer, YOUR UNIQUE PROGRAM OR A COURSE NAME, (I got you!) */}
      <ShowitHero />

      {/* 3. Header bar: Logo | YOU WILL GET | WHAT'S INSIDE | INVESTMENT | ABOUT | IDEAL CLIENT | FAQ | APPLY HERE */}
      <SiteHeader />

      {/* 4. IMAGINE THIS... / PAINT A PICTURE */}
      <ShowitPaintPicture />

      {/* 5. INTRODUCING / VIP DAYS PACKAGE with Laptop Mockup */}
      <ShowitVipDark />

      {/* 6. YOU WILL GET: */}
      <ShowitYouWillGet />

      {/* 7. What Is Inside The Package: Point one, Point two, Point three, Point four */}
      <ShowitInsidePackage />

      {/* 8. IDEAL CLIENT */}
      <ShowitIdealClient />

      {/* 9. ABOUT */}
      <ShowitAbout />

      {/* 10. INVESTMENT */}
      <ShowitInvestment />

      {/* 11. FAQ */}
      <ShowitFaq />
    </>
  );
}
