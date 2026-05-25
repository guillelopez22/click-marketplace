import type { OrderStatus } from "@prisma/client";

const AMAZON_FLOW: OrderStatus[] = [
  "ORDERED",
  "MIAMI_WAREHOUSE",
  "IN_TRANSIT_HN",
  "CUSTOMS",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

const STATUS_LABELS: Record<OrderStatus, string> = {
  ORDERED:           "Pedido recibido",
  MIAMI_WAREHOUSE:   "En bodega Miami",
  IN_TRANSIT_HN:     "En tránsito a Honduras",
  CUSTOMS:           "En aduana",
  OUT_FOR_DELIVERY:  "En camino",
  DELIVERED:         "Entregado",
  RIDER_ASSIGNED:    "Repartidor asignado",
  PICKING_UP:        "Recogiendo tu pedido",
  ON_THE_WAY:        "En camino",
};

export function getStatusLabel(status: OrderStatus): string {
  return STATUS_LABELS[status];
}

export function getNextStatuses(status: OrderStatus): OrderStatus[] {
  const idx = AMAZON_FLOW.indexOf(status);
  if (idx === -1 || idx === AMAZON_FLOW.length - 1) return [];
  return [AMAZON_FLOW[idx + 1]];
}
