import { NextResponse } from "next/server";

interface VercelGeoRequest {
  geo?: { country?: string; city?: string; region?: string };
}

export function GET(request: Request & VercelGeoRequest) {
  // On Vercel, request.geo is populated from edge metadata.
  // Locally undefined — defaults to TGU.
  const country = request.geo?.country ?? "HN";
  const city = country === "HN" ? "TGU" : "TGU";
  return NextResponse.json({ city, country });
}
