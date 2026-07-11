import { EASTERN_TIME_ZONE, dateKeyInDetroit } from "./time.testable";

type MarketDayStatus = {
  isMarketDay: boolean;
  reason: string;
  holidayName?: string;
};

const FIXED_HOLIDAYS: Record<string, string> = {
  "01-01": "New Year's Day",
  "06-19": "Juneteenth National Independence Day",
  "07-04": "Independence Day",
  "12-25": "Christmas Day",
};

function nthWeekday(year: number, monthIndex: number, weekday: number, nth: number) {
  const date = new Date(Date.UTC(year, monthIndex, 1, 12));
  const first = date.getUTCDay();
  const day = 1 + ((weekday - first + 7) % 7) + (nth - 1) * 7;
  return new Date(Date.UTC(year, monthIndex, day, 12));
}

function lastWeekday(year: number, monthIndex: number, weekday: number) {
  const date = new Date(Date.UTC(year, monthIndex + 1, 0, 12));
  while (date.getUTCDay() !== weekday) {
    date.setUTCDate(date.getUTCDate() - 1);
  }
  return date;
}

function easterSunday(year: number) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(year, month, day, 12));
}

function observedFixedHoliday(dateKey: string) {
  const [, month, day] = dateKey.split("-");
  return FIXED_HOLIDAYS[`${month}-${day}`];
}

function holidayForDate(date = new Date()) {
  const key = dateKeyInDetroit(date);
  const [yearText] = key.split("-");
  const year = Number(yearText);
  const fixed = observedFixedHoliday(key);
  if (fixed) return fixed;

  const holidays = new Map<string, string>();
  holidays.set(dateKeyInDetroit(nthWeekday(year, 0, 1, 3)), "Martin Luther King Jr. Day");
  holidays.set(dateKeyInDetroit(nthWeekday(year, 1, 1, 3)), "Presidents' Day");
  holidays.set(dateKeyInDetroit(lastWeekday(year, 4, 1)), "Memorial Day");
  holidays.set(dateKeyInDetroit(nthWeekday(year, 8, 1, 1)), "Labor Day");
  holidays.set(dateKeyInDetroit(nthWeekday(year, 10, 4, 4)), "Thanksgiving Day");
  const goodFriday = easterSunday(year);
  goodFriday.setUTCDate(goodFriday.getUTCDate() - 2);
  holidays.set(dateKeyInDetroit(goodFriday), "Good Friday");

  return holidays.get(key);
}

export function getMarketDayStatus(date = new Date(), generateOnHolidays = false): MarketDayStatus {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: EASTERN_TIME_ZONE,
    weekday: "short",
  }).format(date);

  if (weekday === "Sat" || weekday === "Sun") {
    return { isMarketDay: false, reason: "Weekend" };
  }

  const holidayName = holidayForDate(date);
  if (holidayName && !generateOnHolidays) {
    return { isMarketDay: false, reason: `US Market Closed: ${holidayName}`, holidayName };
  }

  return { isMarketDay: true, reason: holidayName ? `Holiday override enabled: ${holidayName}` : "Regular market day", holidayName };
}

export function nextScheduledRefresh(date = new Date()) {
  const key = dateKeyInDetroit(date);
  return new Date(`${key}T07:00:00-04:00`).toISOString();
}
