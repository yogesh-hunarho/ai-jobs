import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedOrigins = [
  "http://localhost:3000",
  "https://dashboardn.hunarho.com",
  "https://dashboarduat.hunarho.com",
];

export function middleware(req: NextRequest) {
  const origin = req.headers.get("origin") || "";

  // Only apply CORS to API routes
  if (req.nextUrl.pathname.startsWith("/api")) {
    const res = NextResponse.next();

    if (allowedOrigins.includes(origin)) {
      res.headers.set("Access-Control-Allow-Origin", origin);
    }
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.headers.set("Access-Control-Allow-Credentials", "true");

    // Handle OPTIONS preflight
    if (req.method === "OPTIONS") {
      return new NextResponse(null, { headers: res.headers });
    }

    return res;
  }

  return NextResponse.next();
}
