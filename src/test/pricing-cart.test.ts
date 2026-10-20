import { describe, expect, it } from "vitest";
import { SEED_CATALOG } from "@/data/catalog";
import { addLine, cartCount, cartSubtotal, setLineQuantity } from "@/lib/cart";
import { computePrice } from "@/lib/pricing";

const repisa = SEED_CATALOG.products.find((p) => p.id === "repisas-decorativas-parametricas")!;

describe("precio configurable", () => {
  it("medida estándar conserva el precio base", () => {
    expect(computePrice(repisa, SEED_CATALOG.woods, "nogal", "std")).toBe(1850);
  });

  it("aplica medida adicional", () => {
    expect(computePrice(repisa, SEED_CATALOG.woods, "nogal", "grande")).toBe(2450);
  });
});

describe("carrito", () => {
  it("agrupa la misma configuración y separa configuraciones distintas", () => {
    let lines = addLine([], { productId: "x", woodId: "nogal", unitPrice: 100 });
    lines = addLine(lines, { productId: "x", woodId: "nogal", unitPrice: 100 });
    lines = addLine(lines, { productId: "x", woodId: "roble", unitPrice: 90 });
    expect(lines).toHaveLength(2);
    expect(cartCount(lines)).toBe(3);
    expect(cartSubtotal(lines)).toBe(290);
  });

  it("elimina la línea cuando la cantidad llega a cero", () => {
    const lines = addLine([], { productId: "x", unitPrice: 100 });
    expect(setLineQuantity(lines, lines[0]!.key, 0)).toHaveLength(0);
  });
});
