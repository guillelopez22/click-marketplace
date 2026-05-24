import { describe, it, expect } from "vitest";
import {
  getStatusLabel,
  getNextStatuses,
  isAmazonFlow,
  isLocalFlow,
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
    expect(getNextStatuses("ORDERED", "AMAZON")).toEqual(["MIAMI_WAREHOUSE"]);
  });
  it("MIAMI_WAREHOUSE → IN_TRANSIT_HN", () => {
    expect(getNextStatuses("MIAMI_WAREHOUSE", "AMAZON")).toEqual(["IN_TRANSIT_HN"]);
  });
  it("IN_TRANSIT_HN → CUSTOMS", () => {
    expect(getNextStatuses("IN_TRANSIT_HN", "AMAZON")).toEqual(["CUSTOMS"]);
  });
  it("CUSTOMS → OUT_FOR_DELIVERY", () => {
    expect(getNextStatuses("CUSTOMS", "AMAZON")).toEqual(["OUT_FOR_DELIVERY"]);
  });
  it("OUT_FOR_DELIVERY → DELIVERED", () => {
    expect(getNextStatuses("OUT_FOR_DELIVERY", "AMAZON")).toEqual(["DELIVERED"]);
  });
  it("DELIVERED → [] (terminal)", () => {
    expect(getNextStatuses("DELIVERED", "AMAZON")).toEqual([]);
  });
});

describe("getNextStatuses — Local flow", () => {
  it("ORDERED → RIDER_ASSIGNED", () => {
    expect(getNextStatuses("ORDERED", "LOCAL")).toEqual(["RIDER_ASSIGNED"]);
  });
  it("RIDER_ASSIGNED → PICKING_UP", () => {
    expect(getNextStatuses("RIDER_ASSIGNED", "LOCAL")).toEqual(["PICKING_UP"]);
  });
  it("PICKING_UP → ON_THE_WAY", () => {
    expect(getNextStatuses("PICKING_UP", "LOCAL")).toEqual(["ON_THE_WAY"]);
  });
  it("ON_THE_WAY → DELIVERED", () => {
    expect(getNextStatuses("ON_THE_WAY", "LOCAL")).toEqual(["DELIVERED"]);
  });
  it("DELIVERED → [] (terminal)", () => {
    expect(getNextStatuses("DELIVERED", "LOCAL")).toEqual([]);
  });
});

describe("isAmazonFlow", () => {
  it("returns true for Amazon-exclusive statuses", () => {
    expect(isAmazonFlow("MIAMI_WAREHOUSE")).toBe(true);
    expect(isAmazonFlow("IN_TRANSIT_HN")).toBe(true);
    expect(isAmazonFlow("CUSTOMS")).toBe(true);
    expect(isAmazonFlow("OUT_FOR_DELIVERY")).toBe(true);
  });

  it("returns false for shared and local statuses", () => {
    expect(isAmazonFlow("ORDERED")).toBe(false);
    expect(isAmazonFlow("DELIVERED")).toBe(false);
    expect(isAmazonFlow("RIDER_ASSIGNED")).toBe(false);
    expect(isAmazonFlow("ON_THE_WAY")).toBe(false);
  });
});

describe("isLocalFlow", () => {
  it("returns true for local-exclusive statuses", () => {
    expect(isLocalFlow("RIDER_ASSIGNED")).toBe(true);
    expect(isLocalFlow("PICKING_UP")).toBe(true);
    expect(isLocalFlow("ON_THE_WAY")).toBe(true);
  });

  it("returns false for shared and Amazon statuses", () => {
    expect(isLocalFlow("ORDERED")).toBe(false);
    expect(isLocalFlow("DELIVERED")).toBe(false);
    expect(isLocalFlow("MIAMI_WAREHOUSE")).toBe(false);
    expect(isLocalFlow("CUSTOMS")).toBe(false);
  });
});
