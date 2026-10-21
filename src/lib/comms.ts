import type { TranslationKey } from "@/lib/i18n";

/**
 * Standard phrases for further distress communication. The radio wording is always
 * English (like all radio scripts) and therefore lives here once, not in every
 * translation file; only the headings are translated.
 */
export const FURTHER_COMMS: { heading: TranslationKey; text: string }[] = [
  {
    heading: "comms.h.relay",
    text: "MAYDAY [VESSEL NAME IN DISTRESS], [CALL SIGN VESSEL IN DISTRESS]\nThis is [VESSEL NAME], [CALL SIGN]\n[MESSAGE]\nOVER\n",
  },
  {
    heading: "comms.h.silence",
    text: "ALL STATIONS, ALL STATIONS, ALL STATIONS\nSILENCE MAYDAY\n",
  },
  {
    heading: "comms.h.cancel",
    text: "ALL STATIONS, ALL STATIONS, ALL STATIONS\nThis is [VESSEL NAME], [VESSEL NAME], [VESSEL NAME]\nCall sign [CALL SIGN], MMSI [MMSI]\nCancel my false distress alert of [TIME OF DISTRESS CALL] UTC\nOVER\n",
  },
  {
    heading: "comms.h.end",
    text: "MAYDAY\nAll STATIONS, ALL STATIONS, ALL STATIONS\nThis is [COAST STATION NAME / VESSEL NAME IN DISTRESS] at [CURRENT UTC] UTC\n[VESSEL NAME IN DISTRESS], [CALL SIGN VESSEL IN DISTRESS], [MMSI VESSEL IN DISTRESS]\nSILENCE FINI\n",
  },
];
