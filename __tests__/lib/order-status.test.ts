import { describe, it, expect } from "vitest";
import {
  getStatusLabel,
  getNextStatuses,
} from "@/lib/order-status";

describe("getStatusLabel", () => {
  it("returns Spanish labels for all statuses", () => {
    expect(getStatusLabel("ORDERED")).toBe("Pedido recibido");
    expect(getStatusLabel("MIAMI_WAREHOUSE")).toBe("En bodega Miami");
    expect(getStatusLabel("IN_TRANSIT_HN")).toBe("En tránsito a Honduras");
    expect(getStatusLabel("CUSTOMS")).toBe("En aduana");
    expect(getStatusLabel("OUT_FOR_DELIVERY")).toBe("En camino");
    expect(getStatusLabel("DELIVERED")).toBe("Entregado");
    expect(getStatusLabel("RIDER_ASSIGNED")).toBe("Repartidor asignado");
    expect(getStatusLabel("PICKING_UP")).toBe("Recogiendo tu pedido");
    expect(getStatusLabel("ON_THE_WAY")).toBe("En camino");
  });
});

describe("getNextStatuses — Amazon flow", () => {
  it("ORDERED → MIAMI_WAREHOUSE", () => {
    expect(getNextStatuses("ORDERED")).toEqual(["MIAMI_WAREHOUSE"]);
  });
  it("MIAMI_WAREHOUSE → IN_TRANSIT_HN", () => {
    expect(getNextStatuses("MIAMI_WAREHOUSE")).toEqual(["IN_TRANSIT_HN"]);
  });
  it("IN_TRANSIT_HN → CUSTOMS", () => {
    expect(getNextStatuses("IN_TRANSIT_HN")).toEqual(["CUSTOMS"]);
  });
  it("CUSTOMS → OUT_FOR_DELIVERY", () => {
    expect(getNextStatuses("CUSTOMS")).toEqual(["OUT_FOR_DELIVERY"]);
  });
  it("OUT_FOR_DELIVERY → DELIVERED", () => {
    expect(getNextStatuses("OUT_FOR_DELIVERY")).toEqual(["DELIVERED"]);
  });
  it("DELIVERED → [] (terminal)", () => {
    expect(getNextStatuses("DELIVERED")).toEqual([]);
  });
  it("non-Amazon statuses return []", () => {
    expect(getNextStatuses("RIDER_ASSIGNED")).toEqual([]);
    expect(getNextStatuses("ON_THE_WAY")).toEqual([]);
  });
});
