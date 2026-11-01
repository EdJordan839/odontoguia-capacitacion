// Registro de imágenes para YES I'AM — Consultoría de Imagen & Marca Personal.
import yesiamLogo from "@/assets/yesiam/logo.jpg";
import heroConsultant from "@/assets/yesiam/hero-consultant.jpg";
import consultantPortrait from "@/assets/yesiam/consultant-portrait.jpg";
import executiveStylingBoard from "@/assets/images/executive_styling_board_1793510578294.jpg";
import luxuryWatch from "@/assets/images/luxury_watch_suit_1793509261543.jpg";
import luxuryHandbag from "@/assets/images/luxury_leather_accessory_1793509262171.jpg";

export const IMAGE_REGISTRY = {
  "yesiam-logo": yesiamLogo,
  "hero": heroConsultant,
  "hero-consultant": heroConsultant,
  "consultant-portrait": consultantPortrait,
  "executive-styling": executiveStylingBoard,
  "luxury-perfume": executiveStylingBoard,
  "luxury-watch": luxuryWatch,
  "luxury-handbag": luxuryHandbag,
} as const;

export type ImageKey = keyof typeof IMAGE_REGISTRY;

export const IMAGE_KEYS = Object.keys(IMAGE_REGISTRY) as ImageKey[];

export function resolveImage(ref: string): string {
  if (ref in IMAGE_REGISTRY) return IMAGE_REGISTRY[ref as ImageKey];
  return ref;
}
