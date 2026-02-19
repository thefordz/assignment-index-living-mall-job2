import { LIMIT_REQUEST, LIMIT_TIME } from "./constants";

const rateMap = new Map<string, { count: number; start: number }>();

export function checkRateLimit(ip: string) {
  const now = Date.now();
  const record = rateMap.get(ip);

  if (!record) {
    rateMap.set(ip, { count: 1, start: now });
    return {
      allowed: true,
      remaining: LIMIT_REQUEST - 1,
      reset: LIMIT_TIME,
    };
  }

  if (now - record.start > LIMIT_TIME) {
    rateMap.set(ip, { count: 1, start: now });
    return {
      allowed: true,
      remaining: LIMIT_REQUEST - 1,
      reset: LIMIT_TIME,
    };
  }

  if (record.count >= LIMIT_REQUEST) {
    const retryAfter = LIMIT_TIME - (now - record.start);
    return {
      allowed: false,
      remaining: 0,
      reset: retryAfter,
    };
  }

  record.count++;
  return {
    allowed: true,
    remaining: LIMIT_REQUEST - record.count,
    reset: LIMIT_TIME - (now - record.start),
  };
}
