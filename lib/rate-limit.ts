import {
  DEFAULT_LIMIT_REQUEST,
  LIMIT_REQUEST_CONFIG,
  LIMIT_TIME,
} from "./constants";

const rateMap = new Map<string, { count: number; start: number }>();
type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  reset: number;
};

export function checkRateLimit(ip: string, method: string): RateLimitResult {
  const limit =
    LIMIT_REQUEST_CONFIG[method as keyof typeof LIMIT_REQUEST_CONFIG] ??
    DEFAULT_LIMIT_REQUEST;

  const now = Date.now();
  const record = rateMap.get(ip);

  if (!record) {
    rateMap.set(ip, { count: 1, start: now });
    return {
      allowed: true,
      remaining: limit - 1,
      reset: LIMIT_TIME,
    };
  }

  if (now - record.start > LIMIT_TIME) {
    rateMap.set(ip, { count: 1, start: now });
    return {
      allowed: true,
      remaining: limit - 1,
      reset: LIMIT_TIME,
    };
  }

  if (record.count >= limit) {
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
    remaining: limit - record.count,
    reset: LIMIT_TIME - (now - record.start),
  };
}
