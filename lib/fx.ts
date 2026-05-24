import { Decimal } from "@prisma/client/runtime/library";

const FX_RATE = new Decimal(process.env.FX_USD_HNL ?? "24.70");

export function usdToHnl(usd: Decimal, rate: Decimal = FX_RATE): Decimal {
  return usd.mul(rate).toDecimalPlaces(2);
}

export function formatHnl(hnl: Decimal): string {
  const [int, dec] = hnl.toFixed(2).split(".");
  return `L. ${int.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${dec}`;
}

export function formatUsd(usd: Decimal): string {
  const [int, dec] = usd.toFixed(2).split(".");
  return `$${int.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${dec}`;
}
