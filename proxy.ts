import { NextRequest, NextResponse } from "next/server";
import { API_KEY } from "./lib/constants";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api")) {
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
