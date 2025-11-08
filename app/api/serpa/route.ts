import { NextRequest, NextResponse } from "next/server";
import NextCors from "nextjs-cors";


// https://rapidapi.com/fantastic-jobs-fantastic-jobs-default/api/internships-api/playground/apiendpoint_54fae4b2-d2ed-44f9-923d-2bd097ba9194

export async function GET(req: NextRequest) {
  //@ts-ignore
   await NextCors(req, NextResponse.next(), {
    methods: ["GET", "OPTIONS"],
    origin: "*", // or specific domains
    optionsSuccessStatus: 200,
  });
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "";
  const location = searchParams.get("location") || "";
  const offset = searchParams.get("offset") || "0"; // pagination

  const url = new URL("https://internships-api.p.rapidapi.com/active-jb-7d");
  if (title) url.searchParams.append("title_filter", title);
  if (location) url.searchParams.append("location_filter", location);
  url.searchParams.append("offset", offset);

  try {
    const response = await fetch(url.toString(), {
      headers: {
        "x-rapidapi-key": "cde99d5b86msh118ce10a946718ap14fccajsndb8a07dfdf03",
        "x-rapidapi-host": "internships-api.p.rapidapi.com",
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
