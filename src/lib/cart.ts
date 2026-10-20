import type { WoodId } from "@/data/catalog";

export interface CartLine {
  key: string;
  productId: string;
  woodId?: WoodId | undefined;
  sizeId?: string | undefined;
  unitPrice: number;
  quantity: number;
}

export function lineKey(productId: string, woodId?: string, sizeId?: string) {
  return [productId, woodId ?? "-", sizeId ?? "-"].join("|");
}

export function addLine(lines: CartLine[], line: Omit<CartLine, "key" | "quantity">, qty = 1) {
  const key = lineKey(line.productId, line.woodId, line.sizeId);
  const existing = lines.find((l) => l.key === key);
  if (existing) {
    return lines.map((l) => (l.key === key ? { ...l, quantity: l.quantity + qty } : l));
  }
  return [...lines, { ...line, key, quantity: qty }];
}

export function setLineQuantity(lines: CartLine[], key: string, quantity: number) {
  if (quantity <= 0) return lines.filter((l) => l.key !== key);
  return lines.map((l) => (l.key === key ? { ...l, quantity } : l));
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.quantity, 0);
}

export function cartSubtotal(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.unitPrice * l.quantity, 0);
}
