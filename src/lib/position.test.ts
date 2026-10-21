import { describe, expect, it } from "vitest";

import { formatPosition, formatPositionShort, parseCoordinate, type Fix } from "./position";

const fix = (latitude: number, longitude: number): Fix => ({
  latitude,
  longitude,
  accuracy: 5,
  timestamp: 0,
});

describe("parseCoordinate (manual position)", () => {
  it("rejects empty input instead of turning it into 0°", () => {
    expect(parseCoordinate("", "latitude")).toBeNull();
    expect(parseCoordinate("   ", "longitude")).toBeNull();
  });

  it("rejects latitudes beyond ±90° and longitudes beyond ±180°", () => {
    expect(parseCoordinate("90.1", "latitude")).toBeNull();
    expect(parseCoordinate("-91", "latitude")).toBeNull();
    expect(parseCoordinate("180.5", "longitude")).toBeNull();
    expect(parseCoordinate("200", "longitude")).toBeNull();
  });

  it("accepts a comma as decimal separator", () => {
    expect(parseCoordinate("54,321", "latitude")).toBe(54.321);
    expect(parseCoordinate("-10,5", "longitude")).toBe(-10.5);
  });

  it("rejects text that is not a number", () => {
    expect(parseCoordinate("abc", "latitude")).toBeNull();
    expect(parseCoordinate("54°19'", "latitude")).toBeNull();
  });
});

describe("degree/minute rounding", () => {
  it("never writes 60 minutes in the spoken position", () => {
    expect(formatPosition(fix(54.99999, 10.999999), "ddm")).toBe(
      "55 degrees 0.00 minutes North, 011 degrees 0.00 minutes East",
    );
  });

  it("never shows 60 minutes in the on-screen position", () => {
    expect(formatPositionShort(fix(54.9999999, 10.9999999), "ddm")).toBe(
      "55° 0.000' N  011° 0.000' E",
    );
  });

  it("writes south and west hemispheres", () => {
    expect(formatPosition(fix(-33.5, -70.25), "ddm")).toBe(
      "33 degrees 30.00 minutes South, 070 degrees 15.00 minutes West",
    );
  });
});
