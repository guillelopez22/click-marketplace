import { Decimal } from "@prisma/client/runtime/library";

export type ProductSource = "AMAZON" | "LOCAL";
export type City = "TGU" | "SPS";

export interface CartItem {
  priceHNL: Decimal;
  qty: number;
  sourceType: ProductSource;
}

export interface CartTotals {
  subtotal: Decimal;
  deliveryFee: Decimal;
  importFee: Decimal;
  taxes: Decimal;
  total: Decimal;
}

const DELIVERY_LOCAL = new Decimal("50");
const DELIVERY_AMAZON = new Decimal("200");
const IMPORT_FEE_RATE = new Decimal("0.15"); // 15% on Amazon subtotal
const ISV_RATE = new Decimal("0.15"); // Honduras ISV tax

export function computeCartTotals(items: CartItem[], city?: City): CartTotals {
  void city; // accepted for future per-city fee variation
  const amazonItems = items.filter((i) => i.sourceType === "AMAZON");
  const localItems = items.filter((i) => i.sourceType === "LOCAL");

  const amazonSubtotal = amazonItems.reduce(
    (sum, i) => sum.plus(i.priceHNL.mul(i.qty)),
    new Decimal(0)
  );
  const localSubtotal = localItems.reduce(
    (sum, i) => sum.plus(i.priceHNL.mul(i.qty)),
    new Decimal(0)
  );

  const subtotal = amazonSubtotal.plus(localSubtotal);

  const deliveryFee = (amazonItems.length > 0 ? DELIVERY_AMAZON : new Decimal(0)).plus(
    localItems.length > 0 ? DELIVERY_LOCAL : new Decimal(0)
  );

  const importFee = amazonSubtotal.mul(IMPORT_FEE_RATE).toDecimalPlaces(2);
  const taxes = subtotal
    .plus(deliveryFee)
    .plus(importFee)
    .mul(ISV_RATE)
    .toDecimalPlaces(2);
  const total = subtotal.plus(deliveryFee).plus(importFee).plus(taxes);

  return {
    subtotal: subtotal.toDecimalPlaces(2),
    deliveryFee: deliveryFee.toDecimalPlaces(2),
    importFee,
    taxes,
    total: total.toDecimalPlaces(2),
  };
}
