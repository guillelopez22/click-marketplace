import { describe, it, expect } from "vitest";
import { Decimal } from "@prisma/client/runtime/library";
import { computeCartTotals } from "@/lib/cart-math";
import type { CartItem } from "@/lib/cart-math";

function d(val: string | number) {
  return new Decimal(String(val));
}

function item(priceHNL: string, qty: number): CartItem {
  return { priceHNL: d(priceHNL), qty, sourceType: "AMAZON" };
}

describe("computeCartTotals — Amazon orders", () => {
  it("subtotal = sum of priceHNL × qty", () => {
    const totals = computeCartTotals([item("500", 1), item("200", 2)]);
    expect(totals.subtotal.toFixed(2)).toBe("900.00");
  });

  it("deliveryFee = L.200 flat for any non-empty cart", () => {
    const totals = computeCartTotals([item("500", 1)]);
    expect(totals.deliveryFee.toFixed(2)).toBe("200.00");
  });

  it("importFee = 15% of subtotal", () => {
    // subtotal=500, importFee=75
    const totals = computeCartTotals([item("500", 1)]);
    expect(totals.importFee.toFixed(2)).toBe("75.00");
  });

  it("taxes = 15% of (subtotal + deliveryFee + importFee)", () => {
    // subtotal=500, delivery=200, importFee=75, base=775, taxes=116.25
    const totals = computeCartTotals([item("500", 1)]);
    expect(totals.taxes.toFixed(2)).toBe("116.25");
  });

  it("total = subtotal + deliveryFee + importFee + taxes", () => {
    const totals = computeCartTotals([item("500", 1)]);
    const expected = d("500").plus("200").plus("75").plus("116.25");
    expect(totals.total.toFixed(2)).toBe(expected.toFixed(2));
  });

  it("multiple items accumulate correctly", () => {
    const totals = computeCartTotals([item("100", 3), item("50", 2)]);
    expect(totals.subtotal.toFixed(2)).toBe("400.00");
    expect(totals.deliveryFee.toFixed(2)).toBe("200.00");
    expect(totals.importFee.toFixed(2)).toBe("60.00");
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
