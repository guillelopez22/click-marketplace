import type { OrderStatus, ProductSource } from "@prisma/client";

const AMAZON_FLOW: OrderStatus[] = [
  "ORDERED",
  "MIAMI_WAREHOUSE",
  "IN_TRANSIT_HN",
  "CUSTOMS",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

const LOCAL_FLOW: OrderStatus[] = [
  "ORDERED",
  "RIDER_ASSIGNED",
  "PICKING_UP",
  "ON_THE_WAY",
  "DELIVERED",
];

const STATUS_LABELS: Record<OrderStatus, string> = {
  ORDERED: "Pedido recibido",
  MIAMI_WAREHOUSE: "En bodega Miami",
  IN_TRANSIT_HN: "En tránsito a Honduras",
  CUSTOMS: "En aduana",
  OUT_FOR_DELIVERY: "En camino",
  DELIVERED: "Entregado",
  RIDER_ASSIGNED: "Repartidor asignado",
  PICKING_UP: "Recogiendo tu pedido",
  ON_THE_WAY: "En camino",
};

export function getStatusLabel(status: OrderStatus): string {
  return STATUS_LABELS[status];
}

export function getNextStatuses(
  status: OrderStatus,
  sourceType: ProductSource
): OrderStatus[] {
  const flow = sourceType === "AMAZON" ? AMAZON_FLOW : LOCAL_FLOW;
  const idx = flow.indexOf(status);
  if (idx === -1 || idx === flow.length - 1) return [];
  return [flow[idx + 1]];
}

export function isAmazonFlow(status: OrderStatus): boolean {
  return (["MIAMI_WAREHOUSE", "IN_TRANSIT_HN", "CUSTOMS", "OUT_FOR_DELIVERY"] as OrderStatus[]).includes(status);
}

export function isLocalFlow(status: OrderStatus): boolean {
  return (["RIDER_ASSIGNED", "PICKING_UP", "ON_THE_WAY"] as OrderStatus[]).includes(status);
}
