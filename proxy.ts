import { NextRequest, NextResponse } from "next/server";
import { API_KEY } from "./lib/constants";
import { checkRateLimit } from "./lib/rate-limit";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api")) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const result = checkRateLimit(ip);
    if (!result.allowed) {
      const seconds = Math.ceil(result.reset / 1000);

      return NextResponse.json(
        {
          message: `Too may requests. Please try again in ${seconds} seconds.`,
        },
        {
          status: 429,
        },
      );
    }

    const apiKey = request.headers.get("x-api-key");

    if (!apiKey) {
      return NextResponse.json(
        { message: "API key is missing" },
        { status: 401 },
      );
    }

    if (apiKey !== API_KEY) {
      return NextResponse.json({ message: "Invalid API key" }, { status: 401 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
