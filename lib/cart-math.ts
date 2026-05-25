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

const DELIVERY_AMAZON = new Decimal("200");
const IMPORT_FEE_RATE = new Decimal("0.15");
const ISV_RATE = new Decimal("0.15");

export function computeCartTotals(items: CartItem[], city?: City): CartTotals {
  void city;

  const subtotal = items
    .reduce((sum, i) => sum.plus(i.priceHNL.mul(i.qty)), new Decimal(0))
    .toDecimalPlaces(2);

  const deliveryFee = items.length > 0 ? DELIVERY_AMAZON : new Decimal(0);
  const importFee = subtotal.mul(IMPORT_FEE_RATE).toDecimalPlaces(2);
  const taxes = subtotal
    .plus(deliveryFee)
    .plus(importFee)
    .mul(ISV_RATE)
    .toDecimalPlaces(2);
  const total = subtotal.plus(deliveryFee).plus(importFee).plus(taxes).toDecimalPlaces(2);

  return { subtotal, deliveryFee, importFee, taxes, total };
}
