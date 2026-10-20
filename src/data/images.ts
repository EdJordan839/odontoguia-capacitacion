// Registro de imágenes locales para NOGARA (CNC · Diseño · Soluciones).
// El catálogo guarda claves en lugar de URLs con hash de compilación,
// así lo persistido en localStorage sigue funcionando entre versiones.
import nogaraLogo from "@/assets/nogara-logo.png";
import pRepisas from "@/assets/p-repisas.jpg";
import pGrillbox from "@/assets/p-grillbox.jpg";
import pReconocimientoSencillo from "@/assets/p-reconocimiento-sencillo.jpg";
import pReconocimientoPremium from "@/assets/p-reconocimiento-premium.jpg";

export const IMAGE_REGISTRY = {
  "nogara-logo": nogaraLogo,
  "hero": pRepisas,
  "p-repisas": pRepisas,
  "p-grillbox": pGrillbox,
  "p-reconocimiento-sencillo": pReconocimientoSencillo,
  "p-reconocimiento-premium": pReconocimientoPremium,
  // Compatibilidad con claves previas si existen en localStorage
  "space-sala": pRepisas,
  "space-comedor": pGrillbox,
  "space-recamara": pRepisas,
  "space-estudio": pReconocimientoSencillo,
  "space-terraza": pGrillbox,
  "space-decoracion": pReconocimientoPremium,
  "featured-nogal": pRepisas,
  "featured-parota": pGrillbox,
  "featured-roble": pReconocimientoPremium,
  "p-silla": pRepisas,
  "p-mesa-lateral": pGrillbox,
  "p-consola": pReconocimientoSencillo,
  "p-banco": pReconocimientoPremium,
  "p-lampara": pRepisas,
  "p-jarrones": pReconocimientoSencillo,
  "p-espejo": pReconocimientoPremium,
  "p-charola": pGrillbox,
} as const;

export type ImageKey = keyof typeof IMAGE_REGISTRY;

export const IMAGE_KEYS = Object.keys(IMAGE_REGISTRY) as ImageKey[];

export function resolveImage(ref: string): string {
  if (ref in IMAGE_REGISTRY) return IMAGE_REGISTRY[ref as ImageKey];
  return ref;
}
