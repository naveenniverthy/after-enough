import { EASTERN_TIME_ZONE, dateKeyInDetroit } from "./time.testable";

export function easternDateKey(date = new Date()) {
  return dateKeyInDetroit(date);
}

export function easternTimestamp(date = new Date()) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: EASTERN_TIME_ZONE,
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function easternParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: EASTERN_TIME_ZONE,
    weekday: "short",
    hour: "numeric",
    hour12: false,
  }).formatToParts(date);

  return {
    weekday: parts.find((part) => part.type === "weekday")?.value ?? "",
    hour: Number(parts.find((part) => part.type === "hour")?.value ?? "0"),
  };
}

export function shouldRunMorningCron(date = new Date()) {
  const { weekday, hour } = easternParts(date);
  return ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(weekday) && hour === 7;
}
