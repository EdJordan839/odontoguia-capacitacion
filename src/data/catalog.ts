// Modelo de datos del catálogo, desacoplado de la interfaz.
// La UI sólo consume `Catalog`; el origen (semilla local, localStorage o,
// en el futuro, un backend/Shopify) puede cambiar sin tocar componentes.

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
  /** Imagen por tipo de madera (opcional). */
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

export const CATALOG_VERSION = 1;

export const WOODS: WoodOption[] = [
  {
    id: "nogal",
    name: "Nogal",
    origin: "Chihuahua",
    description: "Tono chocolate profundo y veta recta. Elegante y atemporal.",
    priceFactor: 1.12,
  },
  {
    id: "parota",
    name: "Parota",
    origin: "Costa del Pacífico",
    description: "Veta ondulada y cálida en tonos caramelo. Carácter único en cada pieza.",
    priceFactor: 1.08,
  },
  {
    id: "roble",
    name: "Roble",
    origin: "Durango",
    description: "Claro, luminoso y resistente. Ideal para espacios nórdicos y serenos.",
    priceFactor: 1,
  },
];

export const SEED_CATALOG: Catalog = {
  version: CATALOG_VERSION,
  woods: WOODS,
  featuredProductId: "mesa-alameda",
  categories: [
    { id: "mesas", slug: "mesas", name: "Mesas", description: "Comedor, centro y laterales en madera maciza." },
    { id: "asientos", slug: "asientos", name: "Asientos", description: "Sillas, bancos y piezas para sentarse con calma." },
    { id: "almacenaje", slug: "almacenaje", name: "Almacenaje", description: "Consolas, credenzas y libreros." },
    { id: "iluminacion", slug: "iluminacion", name: "Iluminación", description: "Lámparas torneadas a mano." },
    { id: "decoracion", slug: "decoracion", name: "Decoración", description: "Cerámica, espejos y objetos de autor." },
  ],
  spaces: [
    { id: "sala", slug: "sala", name: "Sala", tagline: "Reunir sin prisa", image: "space-sala" },
    { id: "comedor", slug: "comedor", name: "Comedor", tagline: "La mesa como centro", image: "space-comedor" },
    { id: "recamara", slug: "recamara", name: "Recámara", tagline: "Descanso en calma", image: "space-recamara" },
    { id: "estudio", slug: "estudio", name: "Estudio", tagline: "Trabajo con oficio", image: "space-estudio" },
    { id: "terraza", slug: "terraza", name: "Terraza", tagline: "Vivir hacia afuera", image: "space-terraza" },
    { id: "decoracion-espacio", slug: "objetos", name: "Objetos", tagline: "Detalles que cuentan", image: "space-decoracion" },
  ],
  products: [
    {
      id: "mesa-alameda",
      slug: "mesa-alameda",
      name: "Mesa de comedor Alameda",
      categoryId: "mesas",
      spaceIds: ["comedor"],
      price: 38900,
      image: "featured-nogal",
      woodImages: { nogal: "featured-nogal", parota: "featured-parota", roble: "featured-roble" },
      woods: ["nogal", "parota", "roble"],
      sizes: [
        { id: "4p", label: "4 personas", dimensions: "160 × 90 cm", priceDelta: 0 },
        { id: "6p", label: "6 personas", dimensions: "200 × 100 cm", priceDelta: 6500 },
        { id: "8p", label: "8 personas", dimensions: "240 × 105 cm", priceDelta: 12800 },
      ],
      badge: "Pieza insignia",
      description:
        "Cubierta de madera maciza con canto suavizado y patas cónicas ensambladas a mano. Acabado en aceite natural de grado alimenticio.",
      leadTime: "Fabricación en 4–6 semanas",
    },
    {
      id: "silla-cuenca",
      slug: "silla-cuenca",
      name: "Silla Cuenca",
      categoryId: "asientos",
      spaceIds: ["comedor", "estudio"],
      price: 6450,
      image: "p-silla",
      woods: ["nogal", "roble"],
      badge: "Más vendido",
      description: "Respaldo curvo y asiento de bejuco tejido a mano por artesanos de Michoacán.",
      leadTime: "Envío en 2 semanas",
    },
    {
      id: "mesa-gota",
      slug: "mesa-gota",
      name: "Mesa lateral Gota",
      categoryId: "mesas",
      spaceIds: ["sala", "recamara"],
      price: 5890,
      image: "p-mesa-lateral",
      woods: ["parota"],
      description: "Base escultórica tallada en un solo bloque de parota.",
      leadTime: "Envío en 1 semana",
    },
    {
      id: "consola-ribera",
      slug: "consola-ribera",
      name: "Consola Ribera",
      categoryId: "almacenaje",
      spaceIds: ["sala", "recamara"],
      price: 12300,
      compareAtPrice: 14200,
      image: "p-consola",
      woods: ["roble", "nogal"],
      badge: "Precio especial",
      description: "Silueta esbelta para recibidores y pasillos. Ensambles tradicionales sin tornillos visibles.",
      leadTime: "Envío en 2 semanas",
    },
    {
      id: "banco-olivo",
      slug: "banco-olivo",
      name: "Banco Olivo",
      categoryId: "asientos",
      spaceIds: ["recamara", "comedor"],
      price: 8950,
      image: "p-banco",
      woods: ["nogal", "roble"],
      description: "Estructura de nogal con cojín de lino verde olivo desmontable.",
      leadTime: "Envío en 2 semanas",
    },
    {
      id: "lampara-torno",
      slug: "lampara-torno",
      name: "Lámpara Torno",
      categoryId: "iluminacion",
      spaceIds: ["recamara", "estudio"],
      price: 3450,
      image: "p-lampara",
      woods: ["roble"],
      badge: "Nuevo",
      description: "Base de roble torneada a mano y pantalla de lino natural.",
      leadTime: "Envío inmediato",
    },
    {
      id: "jarrones-tierra",
      slug: "jarrones-tierra",
      name: "Set de jarrones Tierra",
      categoryId: "decoracion",
      spaceIds: ["decoracion-espacio", "sala"],
      price: 2190,
      image: "p-jarrones",
      woods: [],
      description: "Tres piezas de cerámica de alta temperatura en verde olivo y arena.",
      leadTime: "Envío inmediato",
    },
    {
      id: "espejo-luna",
      slug: "espejo-luna",
      name: "Espejo Luna",
      categoryId: "decoracion",
      spaceIds: ["recamara", "decoracion-espacio"],
      price: 7800,
      image: "p-espejo",
      woods: ["nogal"],
      description: "Marco grueso de nogal tallado con biselado suave. Ø 90 cm.",
      leadTime: "Envío en 1 semana",
    },
    {
      id: "charola-parota",
      slug: "charola-parota",
      name: "Charola Parota",
      categoryId: "decoracion",
      spaceIds: ["comedor", "decoracion-espacio", "terraza"],
      price: 1890,
      image: "p-charola",
      woods: ["parota"],
      description: "Tallada a mano con asas integradas. Cada veta es irrepetible.",
      leadTime: "Envío inmediato",
    },
  ],
};
