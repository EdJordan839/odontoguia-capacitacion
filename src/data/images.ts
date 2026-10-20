// Registro de imágenes locales. El catálogo guarda claves (p.ej. "space-sala")
// en lugar de URLs con hash de compilación, así lo persistido en localStorage
// sigue funcionando entre versiones. Una URL absoluta (https://…) o ruta (/…)
// también es válida como imagen.
import hero from "@/assets/hero.jpg";
import spaceSala from "@/assets/space-sala.jpg";
import spaceComedor from "@/assets/space-comedor.jpg";
import spaceRecamara from "@/assets/space-recamara.jpg";
import spaceEstudio from "@/assets/space-estudio.jpg";
import spaceTerraza from "@/assets/space-terraza.jpg";
import spaceDecoracion from "@/assets/space-decoracion.jpg";
import featuredNogal from "@/assets/featured-nogal.jpg";
import featuredParota from "@/assets/featured-parota.jpg";
import featuredRoble from "@/assets/featured-roble.jpg";
import pSilla from "@/assets/p-silla.jpg";
import pMesaLateral from "@/assets/p-mesa-lateral.jpg";
import pConsola from "@/assets/p-consola.jpg";
import pBanco from "@/assets/p-banco.jpg";
import pLampara from "@/assets/p-lampara.jpg";
import pJarrones from "@/assets/p-jarrones.jpg";
import pEspejo from "@/assets/p-espejo.jpg";
import pCharola from "@/assets/p-charola.jpg";

export const IMAGE_REGISTRY = {
  hero,
  "space-sala": spaceSala,
  "space-comedor": spaceComedor,
  "space-recamara": spaceRecamara,
  "space-estudio": spaceEstudio,
  "space-terraza": spaceTerraza,
  "space-decoracion": spaceDecoracion,
  "featured-nogal": featuredNogal,
  "featured-parota": featuredParota,
  "featured-roble": featuredRoble,
  "p-silla": pSilla,
  "p-mesa-lateral": pMesaLateral,
  "p-consola": pConsola,
  "p-banco": pBanco,
  "p-lampara": pLampara,
  "p-jarrones": pJarrones,
  "p-espejo": pEspejo,
  "p-charola": pCharola,
} as const;

export type ImageKey = keyof typeof IMAGE_REGISTRY;

export const IMAGE_KEYS = Object.keys(IMAGE_REGISTRY) as ImageKey[];

export function resolveImage(ref: string): string {
  if (ref in IMAGE_REGISTRY) return IMAGE_REGISTRY[ref as ImageKey];
  return ref;
}
