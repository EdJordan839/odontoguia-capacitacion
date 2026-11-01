// Modelo de datos para YES I'AM — Consultoría de Imagen & Marca Personal.

export type WoodId = "standard" | "premium" | "executive";

export interface WoodOption {
  id: WoodId;
  name: string;
  origin: string;
  description: string;
  priceFactor: number;
}

export interface SizeOption {
  id: string;
  label: string;
  dimensions: string;
  priceDelta: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
}

export interface Space {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  spaceIds: string[];
  price: number;
  compareAtPrice?: number | undefined;
  image: string;
  woodImages?: Partial<Record<WoodId, string>>;
  woods: WoodId[];
  sizes?: SizeOption[];
  badge?: string | undefined;
  description: string;
  leadTime: string;
}

export interface Catalog {
  version: number;
  woods: WoodOption[];
  categories: Category[];
  spaces: Space[];
  products: Product[];
  featuredProductId: string;
}

export const CATALOG_VERSION = 4;

export const WOODS: WoodOption[] = [
  {
    id: "standard",
    name: "Modalidad Online",
    origin: "Sesiones por Videollamada HD",
    description: "Acompañamiento interactivo a distancia con entregables digitales.",
    priceFactor: 1,
  },
  {
    id: "premium",
    name: "Modalidad Presencial / Studio",
    origin: "Taller & Estudio de Imagen",
    description: "Experiencia VIP presencial con diagnóstico directo y producción.",
    priceFactor: 1.15,
  },
];

export const SEED_CATALOG: Catalog = {
  version: CATALOG_VERSION,
  woods: WOODS,
  featuredProductId: "programa-executive-branding",
  categories: [
    {
      id: "marca-personal",
      slug: "marca-personal",
      name: "Marca Personal & Reputación",
      description: "Estrategia integral de arquitectura de reputación y posicionamiento de autoridad para ejecutivos y líderes.",
    },
    {
      id: "imagen-publica",
      slug: "imagen-publica",
      name: "Imagen Pública & Estilismo",
      description: "Auditoría de imagen, código de vestimenta, colorimetría y diseño de vestuario profesional.",
    },
    {
      id: "comunicacion-liderazgo",
      slug: "comunicacion",
      name: "Oratoria & Media Training",
      description: "Capacitación en comunicación de alto impacto, proyección escénica y manejo de vocería.",
    },
    {
      id: "presencia-digital",
      slug: "digital",
      name: "Dirección de Arte & Producción",
      description: "Fotografía editorial de retrato, tono de voz de autoridad y curaduría de presencia digital.",
    },
  ],
  spaces: [
    {
      id: "ejecutivos",
      slug: "ejecutivos",
      name: "Ejecutivos & C-Level",
      tagline: "Proyección de autoridad y liderazgo corporativo",
      image: "hero-consultant",
    },
    {
      id: "founders",
      slug: "founders",
      name: "Founders & Emprendedores",
      tagline: "Convierte tu historia en la principal ventaja de tu empresa",
      image: "luxury-watch",
    },
    {
      id: "voceros",
      slug: "voceros",
      name: "Voceros & Figuras Públicas",
      tagline: "Presencia escénica impecable y dominio de medios",
      image: "consultant-portrait",
    },
    {
      id: "conferencias",
      slug: "conferencias",
      name: "Masterclasses & Talleres",
      tagline: "Capacitación de alto nivel para equipos directivos",
      image: "luxury-perfume",
    },
  ],
  products: [
    {
      id: "programa-executive-branding",
      slug: "programa-executive-branding",
      name: "Mentoría Executive Branding 360°",
      categoryId: "marca-personal",
      spaceIds: ["ejecutivos", "founders"],
      price: 18500,
      image: "hero-consultant",
      woodImages: { standard: "hero-consultant", premium: "hero-consultant" },
      woods: ["standard", "premium"],
      sizes: [
        { id: "individual", label: "Programa Intensivo (8 Semanas)", dimensions: "Sesiones 1 a 1 + Asesoría ilimitada", priceDelta: 0 },
        { id: "vip", label: "Edición VIP + Producción Editorial", dimensions: "Incluye sesión de fotos studio + Media kit", priceDelta: 6500 },
      ],
      badge: "Programa Insignia",
      description:
        "Programa intensivo de 8 semanas de transformación de marca personal. Incluye auditoría reputacional, propuesta de valor de autoridad, código visual corporativo, producción fotográfica editorial y estrategia de posicionamiento mediático.",
      leadTime: "Acompañamiento personalizado 1 a 1",
    },
    {
      id: "consultoria-estilismo-fondo-armario",
      slug: "consultoria-estilismo-fondo-armario",
      name: "Consultoría de Imagen & Fondo de Armario Intelligent",
      categoryId: "imagen-publica",
      spaceIds: ["ejecutivos", "voceros"],
      price: 8900,
      compareAtPrice: 10500,
      image: "consultant-portrait",
      woodImages: { standard: "consultant-portrait", premium: "consultant-portrait" },
      woods: ["standard", "premium"],
      sizes: [
        { id: "standard", label: "Diagnóstico + Lookbook Digital", dimensions: "Sesión de 3 horas + Guía interactiva", priceDelta: 0 },
        { id: "full", label: "Diagnóstico + Personal Shopper", dimensions: "Incluye acompañamiento presencial de compras", priceDelta: 4200 },
      ],
      badge: "Más Solicitado",
      description:
        "Análisis morfológico, diagnóstico de colorimetría presencial/digital y reestructuración completa de tu guardarropa profesional. Creamos un lookbook digital interactivo con más de 40 combinaciones de alto nivel.",
      leadTime: "Entregables en 48 horas",
    },
    {
      id: "media-training-oratoria",
      slug: "media-training-oratoria",
      name: "Mastery en Oratoria, Presencia & Media Training",
      categoryId: "comunicacion-liderazgo",
      spaceIds: ["voceros", "conferencias"],
      price: 12500,
      image: "luxury-watch",
      woodImages: { standard: "luxury-watch", premium: "luxury-watch" },
      woods: ["standard", "premium"],
      sizes: [
        { id: "bootcamp", label: "Entrenamiento Intensivo de 2 Días", dimensions: "Prácticas grabadas con feedback directo", priceDelta: 0 },
      ],
      badge: "Presencial / Online",
      description:
        "Dominio de escenarios, entrevistas en televisión/podcast y pitch de negocios. Entrenamiento de lenguaje corporal, manejo de voz y técnicas de persuasión para proyectar liderazgo instantáneo.",
      leadTime: "Agendamiento bajo solicitud",
    },
    {
      id: "produccion-direccion-arte",
      slug: "produccion-direccion-arte",
      name: "Dirección de Arte & Producción Fotográfica Editorial",
      categoryId: "presencia-digital",
      spaceIds: ["founders", "ejecutivos"],
      price: 14200,
      image: "luxury-perfume",
      woodImages: { standard: "luxury-perfume", premium: "luxury-perfume" },
      woods: ["standard", "premium"],
      sizes: [
        { id: "editorial-standard", label: "Sesión Editorial (10 Retratos)", dimensions: "Estudio + 3 Cambios de Look", priceDelta: 0 },
        { id: "editorial-premium", label: "Sesión Editorial Premium (20 Retratos + Video)", dimensions: "Estudio/Locación + 5 Cambios + Reel HD", priceDelta: 5800 },
      ],
      badge: "Calidad Vogue",
      description:
        "Diseño conceptual de tu sesión fotográfica profesional. Incluye styling de vestuario en set, estudio profesional, maquillaje/peinado ejecutivo y entrega de retratos de alta resolución para prensa y sitio web.",
      leadTime: "Entrega de material en 5 días hábiles",
    },
  ],
};
