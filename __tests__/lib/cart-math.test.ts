import { describe, it, expect } from "vitest";
import { Decimal } from "@prisma/client/runtime/library";
import { computeCartTotals } from "@/lib/cart-math";
import type { CartItem } from "@/lib/cart-math";

function d(val: string | number) {
  return new Decimal(String(val));
}

function item(priceHNL: string, qty: number, sourceType: "AMAZON" | "LOCAL"): CartItem {
  return { priceHNL: d(priceHNL), qty, sourceType };
}

describe("computeCartTotals — local only", () => {
  it("subtotal = sum of priceHNL × qty", () => {
    const totals = computeCartTotals([item("100", 2, "LOCAL"), item("50", 1, "LOCAL")]);
    expect(totals.subtotal.toFixed(2)).toBe("250.00");
  });

  it("deliveryFee = L.50 for local items", () => {
    const totals = computeCartTotals([item("100", 1, "LOCAL")]);
    expect(totals.deliveryFee.toFixed(2)).toBe("50.00");
  });

  it("importFee = 0 for local items", () => {
    const totals = computeCartTotals([item("100", 1, "LOCAL")]);
    expect(totals.importFee.toFixed(2)).toBe("0.00");
  });

  it("taxes = 15% of (subtotal + deliveryFee)", () => {
    // subtotal=100, delivery=50, base=150, taxes=22.50
    const totals = computeCartTotals([item("100", 1, "LOCAL")]);
    expect(totals.taxes.toFixed(2)).toBe("22.50");
  });

  it("total = subtotal + deliveryFee + importFee + taxes", () => {
    const totals = computeCartTotals([item("100", 1, "LOCAL")]);
    const expected = d("100").plus("50").plus("0").plus("22.50");
    expect(totals.total.toFixed(2)).toBe(expected.toFixed(2));
  });
});

describe("computeCartTotals — Amazon only", () => {
  it("deliveryFee = L.200 for Amazon items", () => {
    const totals = computeCartTotals([item("500", 1, "AMAZON")]);
    expect(totals.deliveryFee.toFixed(2)).toBe("200.00");
  });

  it("importFee = 15% of Amazon subtotal", () => {
    // subtotal=500, importFee=75
    const totals = computeCartTotals([item("500", 1, "AMAZON")]);
    expect(totals.importFee.toFixed(2)).toBe("75.00");
  });

  it("taxes = 15% of (subtotal + deliveryFee + importFee)", () => {
    // subtotal=500, delivery=200, importFee=75, base=775, taxes=116.25
    const totals = computeCartTotals([item("500", 1, "AMAZON")]);
    expect(totals.taxes.toFixed(2)).toBe("116.25");
  });
});

describe("computeCartTotals — mixed cart", () => {
  it("deliveryFee = L.250 for mixed cart", () => {
    const totals = computeCartTotals([item("100", 1, "AMAZON"), item("50", 1, "LOCAL")]);
    expect(totals.deliveryFee.toFixed(2)).toBe("250.00");
  });

  it("importFee only on Amazon subtotal", () => {
    // amazon subtotal = 100, importFee = 15
    const totals = computeCartTotals([item("100", 1, "AMAZON"), item("50", 1, "LOCAL")]);
    expect(totals.importFee.toFixed(2)).toBe("15.00");
  });
});

describe("computeCartTotals — empty cart", () => {
  it("returns all zeros for empty cart", () => {
    const totals = computeCartTotals([]);
    expect(totals.subtotal.toFixed(2)).toBe("0.00");
    expect(totals.deliveryFee.toFixed(2)).toBe("0.00");
    expect(totals.importFee.toFixed(2)).toBe("0.00");
    expect(totals.taxes.toFixed(2)).toBe("0.00");
    expect(totals.total.toFixed(2)).toBe("0.00");
  });
});
