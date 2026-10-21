import { describe, expect, it } from "vitest";

import { buildScript, type TemplateContext } from "./templates";
import type { CallInput, Vessel } from "./types";

const vessel: Vessel = {
  id: "v1",
  name: "Seeadler",
  mmsi: "211234567",
  callSign: "DA1234",
};

const emptyInput: CallInput = {
  nature: "",
  assistance: "immediate assistance",
  pob: "",
  channel: "16",
  station: "",
  message: "",
};

const ctx = (input: Partial<CallInput> = {}, v: Vessel | null = vessel): TemplateContext => ({
  vessel: v,
  fix: { latitude: 54.5, longitude: 10.25, accuracy: 5, timestamp: 0 },
  now: new Date(Date.UTC(2026, 9, 21, 14, 7, 0)),
  input: { ...emptyInput, ...input },
  positionFormat: "ddm",
});

describe("Mayday script", () => {
  const lines = buildScript("mayday", ctx({ nature: "Sinking" })).split("\n");

  it("opens with MAYDAY three times and ends with OVER", () => {
    expect(lines[0]).toBe("MAYDAY, MAYDAY, MAYDAY");
    expect(lines.at(-1)).toBe("OVER");
  });

  it("names the vessel three times with call sign and MMSI", () => {
    expect(lines[1]).toBe("This is SEEADLER, SEEADLER, SEEADLER");
    expect(lines[2]).toBe("Call sign DA1234, MMSI 211234567");
  });

  it("includes position and UTC time", () => {
    expect(lines).toContain("My position is 54 degrees 30.00 minutes North, 010 degrees 15.00 minutes East");
    expect(lines).toContain("Time 1407 UTC");
  });
});

describe("optional lines", () => {
  it("leaves out persons on board when no number is known", () => {
    expect(buildScript("mayday", ctx())).not.toMatch(/persons on board/);
  });

  it("adds persons on board when given", () => {
    expect(buildScript("mayday", ctx({ pob: "4" }))).toContain("4 persons on board");
  });

  it("leaves out further information when empty", () => {
    const withMessage = buildScript("panpan", ctx({ message: "Drifting towards rocks" }));
    const without = buildScript("panpan", ctx());
    expect(withMessage).toContain("Drifting towards rocks");
    expect(without.split("\n")).toHaveLength(withMessage.split("\n").length - 1);
  });
});

describe("Sécurité script", () => {
  it("ends with OVER, not OUT", () => {
    const lines = buildScript("securite", ctx({ nature: "Container adrift" })).split("\n");
    expect(lines[0]).toBe("SÉCURITÉ, SÉCURITÉ, SÉCURITÉ");
    expect(lines.at(-1)).toBe("OVER");
  });
});

describe("missing data", () => {
  it("marks missing vessel data in brackets", () => {
    const script = buildScript("mayday", ctx({}, null));
    expect(script).toContain("[VESSEL NAME]");
    expect(script).toContain("[MMSI]");
  });
});
