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

export const CATALOG_VERSION = 5;

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
  featuredProductId: "imagen-ejecutiva",
  categories: [
    {
      id: "ejecutiva",
      slug: "imagen-ejecutiva",
      name: "Imagen Ejecutiva",
      description: "Posicionamiento de liderazgo y código de vestir para altos mandos y directivos.",
    },
    {
      id: "personal",
      slug: "imagen-personal",
      name: "Imagen Personal",
      description: "Estilismo individual, colorimetría, fisonomía y optimización de armario.",
    },
    {
      id: "publica",
      slug: "imagen-publica",
      name: "Imagen Pública",
      description: "Estrategia de reputación, vocería ante medios de comunicación y presencia escénica.",
    },
    {
      id: "empresas",
      slug: "imagen-empresas",
      name: "Imagen para Empresas",
      description: "Manuales institucionales de código visual y capacitaciones a equipos corporativos.",
    },
  ],
  spaces: [
    {
      id: "ejecutivos",
      slug: "ejecutivos",
      name: "Directivos & C-Level",
      tagline: "Proyección de autoridad y presencia ejecutiva",
      image: "hero-consultant",
    },
    {
      id: "personales",
      slug: "personales",
      name: "Asesoría Individual",
      tagline: "Descubre tu potencial de estilo y presencia",
      image: "consultant-portrait",
    },
    {
      id: "voceros",
      slug: "voceros",
      name: "Voceros & Medios",
      tagline: "Dominio escénico y proyección en medios",
      image: "luxury-watch",
    },
    {
      id: "corporativos",
      slug: "corporativos",
      name: "Equipos Corporativos",
      tagline: "Cultura visual e identidad para empresas",
      image: "executive-styling",
    },
  ],
  products: [
    {
      id: "imagen-ejecutiva",
      slug: "imagen-ejecutiva",
      name: "Imagen Ejecutiva",
      categoryId: "ejecutiva",
      spaceIds: ["ejecutivos"],
      price: 14500,
      image: "hero-consultant",
      woodImages: { standard: "hero-consultant", premium: "hero-consultant" },
      woods: ["standard", "premium"],
      sizes: [
        { id: "individual", label: "Diagnóstico Ejecutivo 360°", dimensions: "Sesión personalizada + Lookbook corporativo", priceDelta: 0 },
        { id: "vip", label: "Edición VIP + Dirección de Arte", dimensions: "Incluye producción fotográfica de retrato", priceDelta: 5500 },
      ],
      badge: "C-Level & Directivos",
      description:
        "Diseñada para directivos, CEOs y ejecutivos de alto rendimiento. Desarrollamos una estrategia visual y de vestuario corporativo que proyecta liderazgo, autoridad y congruencia institucional.",
      leadTime: "Auditoría presencial o virtual + Lookbook",
    },
    {
      id: "imagen-personal",
      slug: "imagen-personal",
      name: "Imagen Personal",
      categoryId: "personal",
      spaceIds: ["personales"],
      price: 8900,
      compareAtPrice: 10500,
      image: "consultant-portrait",
      woodImages: { standard: "consultant-portrait", premium: "consultant-portrait" },
      woods: ["standard", "premium"],
      sizes: [
        { id: "standard", label: "Diagnóstico + Lookbook Digital", dimensions: "Sesión de 3 horas + Guía interactiva", priceDelta: 0 },
        { id: "full", label: "Diagnóstico + Personal Shopper", dimensions: "Incluye acompañamiento presencial de compras", priceDelta: 4200 },
      ],
      badge: "Asesoría 1 a 1 VIP",
      description:
        "Análisis integral de morfología, estudio de colorimetría y reestructuración inteligente de guardarropa personal. Descubre tu estilo auténtico y optimiza tus combinaciones diarias con elegancia.",
      leadTime: "Sesión de 3 hrs + Diagnóstico digital",
    },
    {
      id: "imagen-publica",
      slug: "imagen-publica",
      name: "Imagen Pública",
      categoryId: "publica",
      spaceIds: ["voceros"],
      price: 16800,
      image: "luxury-watch",
      woodImages: { standard: "luxury-watch", premium: "luxury-watch" },
      woods: ["standard", "premium"],
      sizes: [
        { id: "bootcamp", label: "Entrenamiento de Vocería & Medios", dimensions: "Prácticas grabadas con feedback directo", priceDelta: 0 },
      ],
      badge: "Medios & Vocería",
      description:
        "Estrategia reputacional y entrenamiento de comunicación para voceros, conferencistas y figuras públicas. Incluye lenguaje no verbal, manejo de entrevistas, presencia escénica y media kit.",
      leadTime: "Entrenamiento intensivo personalizado",
    },
    {
      id: "imagen-empresas",
      slug: "imagen-empresas",
      name: "Imagen para Empresas",
      categoryId: "empresas",
      spaceIds: ["corporativos"],
      price: 24000,
      image: "executive-styling",
      woodImages: { standard: "executive-styling", premium: "executive-styling" },
      woods: ["standard", "premium"],
      sizes: [
        { id: "editorial-standard", label: "Capacitación Corporativa (Hasta 15 personas)", dimensions: "Taller presencial + Manual institucional", priceDelta: 0 },
      ],
      badge: "Capacitación Institucional",
      description:
        "Transformación de la proyección de equipos ejecutivos y fuerza de ventas. Elaboración de manuales de código de vestimenta de marca, protocolo empresarial y talleres corporativos.",
      leadTime: "Talleres presenciales para equipos",
    },
  ],
};
