export type LogFields = Record<string, unknown>;

export function maskEmail(email: string | undefined | null) {
  if (!email || !email.includes("@")) {
    return "unknown";
  }

  const [name, domain] = email.split("@");
  return `${name.slice(0, 2)}***@${domain}`;
}

function sanitize(fields: LogFields = {}) {
  const blocked = /key|secret|token|authorization|jwt/i;
  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [
      key,
      blocked.test(key) ? "[redacted]" : key.toLowerCase().includes("email") ? maskEmail(String(value)) : value,
    ]),
  );
}

export function logInfo(event: string, fields?: LogFields) {
  console.info(JSON.stringify({ level: "info", event, ...sanitize(fields) }));
}

export function logWarn(event: string, fields?: LogFields) {
  console.warn(JSON.stringify({ level: "warn", event, ...sanitize(fields) }));
}

export function logError(event: string, fields?: LogFields) {
  console.error(JSON.stringify({ level: "error", event, ...sanitize(fields) }));
}
