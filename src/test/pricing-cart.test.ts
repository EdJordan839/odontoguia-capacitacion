import { describe, expect, it } from "vitest";
import { SEED_CATALOG } from "@/data/catalog";
import { addLine, cartCount, cartSubtotal, setLineQuantity } from "@/lib/cart";
import { computePrice } from "@/lib/pricing";

const mesa = SEED_CATALOG.products.find((p) => p.id === "mesa-alameda")!;

describe("precio configurable", () => {
  it("roble en 4 personas conserva el precio base", () => {
    expect(computePrice(mesa, SEED_CATALOG.woods, "roble", "4p")).toBe(38900);
  });

  it("aplica medida y factor de madera", () => {
    // (38,900 + 6,500) × 1.12 = 50,848 → redondeo a decenas
    expect(computePrice(mesa, SEED_CATALOG.woods, "nogal", "6p")).toBe(50850);
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
    expect(setLineQuantity(lines, lines[0].key, 0)).toHaveLength(0);
  });
});
