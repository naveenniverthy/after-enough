export const EASTERN_TIME_ZONE = "America/Detroit";

export function dateKeyInDetroit(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: EASTERN_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function previousUsMarketClose(now = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: EASTERN_TIME_ZONE,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = Object.fromEntries(formatter.formatToParts(now).map((part) => [part.type, part.value]));
  const hour = Number(parts.hour);
  const minute = Number(parts.minute);
  const current = new Date(now);
  const easternDay = new Date(`${parts.year}-${parts.month}-${parts.day}T00:00:00-05:00`);
  const weekday = parts.weekday;
  const afterClose = hour > 16 || (hour === 16 && minute >= 0);
  const marketDay = ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(weekday);
  let daysBack = marketDay && afterClose ? 0 : 1;

  while (daysBack < 7) {
    const candidate = new Date(current);
    candidate.setUTCDate(candidate.getUTCDate() - daysBack);
    const candidateWeekday = new Intl.DateTimeFormat("en-US", {
      timeZone: EASTERN_TIME_ZONE,
      weekday: "short",
    }).format(candidate);
    if (["Mon", "Tue", "Wed", "Thu", "Fri"].includes(candidateWeekday)) {
      const key = dateKeyInDetroit(candidate);
      return new Date(`${key}T16:00:00-04:00`);
    }
    daysBack += 1;
  }

  return easternDay;
}

export function todayAndTomorrowDetroit(now = new Date()) {
  const today = dateKeyInDetroit(now);
  const tomorrowDate = new Date(now);
  tomorrowDate.setUTCDate(tomorrowDate.getUTCDate() + 1);
  return {
    today,
    tomorrow: dateKeyInDetroit(tomorrowDate),
  };
}

export function minutesUntil(eventTime: string, now = new Date()) {
  return Math.floor((new Date(eventTime).getTime() - now.getTime()) / 60000);
}

export function countdownText(eventTime?: string, now = new Date()) {
  if (!eventTime) {
    return "No countdown";
  }

  const minutes = minutesUntil(eventTime, now);
  if (minutes <= 0) {
    return "Event time has passed";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return hours > 0 ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}m`;
}

export function isStaleTimestamp(timestamp: string | null | undefined, maxAgeMinutes: number, now = new Date()) {
  if (!timestamp) {
    return true;
  }

  return now.getTime() - new Date(timestamp).getTime() > maxAgeMinutes * 60_000;
}
