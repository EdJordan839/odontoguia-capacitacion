// Modelo de datos del catálogo para NOGARA (CNC · Diseño · Soluciones).
// Desacoplado de la interfaz para permitir fuentes locales o remotas sin alterar componentes.

export type WoodId = "nogal" | "parota" | "roble";

export interface WoodOption {
  id: WoodId;
  name: string;
  origin: string;
  description: string;
  /** Multiplicador sobre el precio base (1 = sin cambio). */
  priceFactor: number;
}

export interface SizeOption {
  id: string;
  label: string;
  dimensions: string;
  /** Monto adicional en MXN sobre el precio base. */
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
  /** Imagen por acabado/variante (opcional). */
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

export const CATALOG_VERSION = 3;

export const WOODS: WoodOption[] = [
  {
    id: "nogal",
    name: "Tono Nogal Oscuro",
    origin: "Acabado especial",
    description: "Tono oscuro refinado con vetas marcadas y sellador mate.",
    priceFactor: 1,
  },
  {
    id: "parota",
    name: "Cedro / Rústico",
    origin: "Madera tratada",
    description: "Vetas acentuadas al fuego con recubrimiento para exteriores.",
    priceFactor: 1.05,
  },
  {
    id: "roble",
    name: "Pino / Tono Natural",
    origin: "Madera sólida",
    description: "Tono claro contemporáneo con textura suave.",
    priceFactor: 1,
  },
];

export const SEED_CATALOG: Catalog = {
  version: CATALOG_VERSION,
  woods: WOODS,
  featuredProductId: "repisas-decorativas-parametricas",
  categories: [
    {
      id: "repisas-paneles",
      slug: "parametrico",
      name: "Diseño Paramétrico",
      description: "Repisas escultóricas de muro y paneles tridimensionales fabricados con precisión CNC.",
    },
    {
      id: "asadores-outdoor",
      slug: "grill",
      name: "Grill & Asadores",
      description: "Cajas parrilleras térmicas con insertos de acero inoxidable para parrilladas de alto nivel.",
    },
    {
      id: "reconocimientos",
      slug: "reconocimientos",
      name: "Reconocimientos & Trofeos",
      description: "Galardones y placas conmemorativas en acrílico cristal y bicapa con corte y grabado láser.",
    },
  ],
  spaces: [
    {
      id: "muros-decoracion",
      slug: "muros",
      name: "Muros & Diseño",
      tagline: "Dinamismo y estética tridimensional",
      image: "p-repisas",
    },
    {
      id: "asados-terraza",
      slug: "asados",
      name: "Parrilla & Jardín",
      tagline: "El mejor asado con presentación profesional",
      image: "p-grillbox",
    },
    {
      id: "corporativo",
      slug: "corporativo",
      name: "Corporativo & Galardones",
      tagline: "Reconocimientos de prestigio para empresas",
      image: "p-reconocimiento-premium",
    },
    {
      id: "eventos-graduaciones",
      slug: "graduaciones",
      name: "Graduaciones & Conmemoraciones",
      tagline: "Detalles imborrables grabados con precisión láser",
      image: "p-reconocimiento-sencillo",
    },
  ],
  products: [
    {
      id: "repisas-decorativas-parametricas",
      slug: "repisas-decorativas-parametricas",
      name: "Repisas decorativas paramétricas",
      categoryId: "repisas-paneles",
      spaceIds: ["muros-decoracion"],
      price: 1850,
      image: "p-repisas",
      woodImages: { nogal: "p-repisas", parota: "p-repisas", roble: "p-repisas" },
      woods: ["nogal", "roble"],
      sizes: [
        { id: "std", label: "Estándar (90 cm)", dimensions: "90 × 22 × 18 cm", priceDelta: 0 },
        { id: "grande", label: "Grande (120 cm)", dimensions: "120 × 26 × 20 cm", priceDelta: 600 },
      ],
      badge: "Diseño insignia",
      description:
        "Repisa de muro paramétrica con silueta ondulada tridimensional de alta precisión fabricada mediante maquinado CNC. Transforma cualquier pared en una pieza escultórica funcional con juego dinámico de luces y sombras.",
      leadTime: "Fabricación CNC en 3–5 días hábiles",
    },
    {
      id: "grill-box",
      slug: "grill-box",
      name: "Grill Box para asados",
      categoryId: "asadores-outdoor",
      spaceIds: ["asados-terraza"],
      price: 2200,
      image: "p-grillbox",
      woodImages: { nogal: "p-grillbox", parota: "p-grillbox", roble: "p-grillbox" },
      woods: ["parota", "nogal"],
      sizes: [
        { id: "5kg", label: "5 kg (1 tina profunda)", dimensions: "Capacidad para 5 kg de cortes", priceDelta: 0 },
        { id: "8kg", label: "8 kg (2 tinas + guarnición)", dimensions: "Capacidad para 8 kg de cortes", priceDelta: 600 },
      ],
      badge: "Más vendido",
      description:
        "Caja parrillera térmica Grill Box con tinas e insertos de acero inoxidable grado alimenticio y tapas herméticas. Fabricada en madera tratada con acabado rústico quemado y sellador especial para exteriores. 3 diseños disponibles en pino o cedro. Ideal para mantener los cortes calientes y servir con distinción.",
      leadTime: "Entrega inmediata o fabricación en 3 días",
    },
    {
      id: "reconocimiento-sencillo",
      slug: "reconocimiento-sencillo",
      name: "Reconocimiento sencillo en acrílico",
      categoryId: "reconocimientos",
      spaceIds: ["eventos-graduaciones", "corporativo"],
      price: 350,
      compareAtPrice: 420,
      image: "p-reconocimiento-sencillo",
      badge: "Mayoreo desde $250",
      description:
        "Placa conmemorativa de reconocimiento fabricada en acrílico cristal de primera calidad con base biselada y detalles espejados. Grabado láser nítido y personalizado para graduaciones, eventos académicos, diplomas de honor y padrinos de generación. Menudeo $350 MXN (mayoreo desde $250 MXN).",
      sizes: [
        { id: "chico", label: "Chico (15 × 20 cm)", dimensions: "15 × 20 cm", priceDelta: 0 },
        { id: "mediano", label: "Mediano (20 × 25 cm)", dimensions: "20 × 25 cm", priceDelta: 120 },
      ],
      woods: [],
      leadTime: "Entrega en 24–48 horas con diseño personalizado",
    },
    {
      id: "reconocimientos-premium",
      slug: "reconocimientos-premium",
      name: "Reconocimiento premium bicapa y espejo",
      categoryId: "reconocimientos",
      spaceIds: ["corporativo", "eventos-graduaciones"],
      price: 500,
      image: "p-reconocimiento-premium",
      badge: "Mayoreo desde $400",
      description:
        "Trofeo y reconocimiento corporativo de diseño premium en acrílico bicapa negro brillante y dorado espejado, con detalles troquelados en láser CNC. Base de acrílico con reflejo dorado y tipografía en relieve. Menudeo $500 MXN (mayoreo desde $400 MXN). Perfecto para aniversarios empresariales, distinciones especiales y XV años.",
      sizes: [
        { id: "chico", label: "Chico (15 × 20 cm)", dimensions: "15 × 20 cm", priceDelta: 0 },
        { id: "mediano", label: "Mediano (18 × 25 cm)", dimensions: "18 × 25 cm", priceDelta: 180 },
      ],
      woods: [],
      leadTime: "Entrega en 2–3 días hábiles",
    },
  ],
};
