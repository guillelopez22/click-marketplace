import { describe, it, expect } from "vitest";
import { Decimal } from "@prisma/client/runtime/library";
import { usdToHnl, formatHnl, formatUsd } from "@/lib/fx";

describe("usdToHnl", () => {
  it("converts at the default rate (24.70)", () => {
    expect(usdToHnl(new Decimal("10")).toFixed(2)).toBe("247.00");
  });

  it("converts at a custom rate", () => {
    expect(usdToHnl(new Decimal("10"), new Decimal("25")).toFixed(2)).toBe("250.00");
  });

  it("rounds to 2 decimal places", () => {
    const result = usdToHnl(new Decimal("1"), new Decimal("24.70"));
    expect(result.decimalPlaces()).toBeLessThanOrEqual(2);
  });

  it("handles zero", () => {
    expect(usdToHnl(new Decimal("0")).toFixed(2)).toBe("0.00");
  });
});

describe("formatHnl", () => {
  it("formats with L. prefix", () => {
    expect(formatHnl(new Decimal("1234.50"))).toBe("L. 1,234.50");
  });

  it("formats millions", () => {
    expect(formatHnl(new Decimal("1000000"))).toBe("L. 1,000,000.00");
  });

  it("formats small values", () => {
    expect(formatHnl(new Decimal("9.99"))).toBe("L. 9.99");
  });

  it("pads missing decimals", () => {
    expect(formatHnl(new Decimal("50"))).toBe("L. 50.00");
  });
});

describe("formatUsd", () => {
  it("formats with $ prefix", () => {
    expect(formatUsd(new Decimal("99.99"))).toBe("$99.99");
  });

  it("formats thousands", () => {
    expect(formatUsd(new Decimal("1234.56"))).toBe("$1,234.56");
  });

  it("pads missing decimals", () => {
    expect(formatUsd(new Decimal("10"))).toBe("$10.00");
  });
});
