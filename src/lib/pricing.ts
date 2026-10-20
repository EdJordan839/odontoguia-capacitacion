import type { Product, WoodId, WoodOption } from "@/data/catalog";

const mxn = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export function formatMXN(value: number): string {
  return mxn.format(value);
}

/** Precio final según madera y medida, redondeado a decenas de peso. */
export function computePrice(
  product: Pick<Product, "price" | "sizes">,
  woods: WoodOption[],
  woodId?: WoodId,
  sizeId?: string,
): number {
  const factor = woods.find((w) => w.id === woodId)?.priceFactor ?? 1;
  const delta = product.sizes?.find((s) => s.id === sizeId)?.priceDelta ?? 0;
  return Math.round(((product.price + delta) * factor) / 10) * 10;
}
