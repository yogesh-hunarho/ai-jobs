// import { NextRequest, NextResponse } from "next/server";

// const APIKEY="cde99d5b86msh118ce10a946718ap14fccajsndb8a07dfdf03"

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);

//   const title = searchParams.get("title") || "";
//   const location = searchParams.get("location") || "";
//   const offset = searchParams.get("offset") || "0";
//   const limit = searchParams.get("limit") || "10";

//   const url = new URL("https://linkedin-job-search-api.p.rapidapi.com/active-jb-24h");

//   if (title) url.searchParams.append("title_filter", title);
//   if (location) url.searchParams.append("location_filter", location);
//   url.searchParams.append("offset", offset);
//   url.searchParams.append("limit", limit);

//   try {
//     const response = await fetch(url.toString(), {
//       method: "GET",
//       headers: {
//         "x-rapidapi-host": "linkedin-job-search-api.p.rapidapi.com",
//         "x-rapidapi-key": APIKEY
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`API error: ${response.statusText}`);
//     }

//     const data = await response.json();
//     return NextResponse.json({ success: true, data });
//   } catch (error: unknown) {
//     console.error("Error fetching jobs:", error);
//     const message =
//       error instanceof Error ? error.message : "Unknown error occurred";
//     return NextResponse.json(
//       { success: false, error: message },
//       { status: 500 }
//     );
//   }
// }



import { NextRequest, NextResponse } from "next/server";

const APIKEY="cde99d5b86msh118ce10a946718ap14fccajsndb8a07dfdf03"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title") || "";
  const location = searchParams.get("location") || "";
  const offset = searchParams.get("offset") || "0";
  const limit = searchParams.get("limit") || "10";

  const url = new URL("https://active-jobs-db.p.rapidapi.com/active-ats-24h");

  if (title) url.searchParams.append("title_filter", title);
  if (location) url.searchParams.append("location_filter", location);
  url.searchParams.append("offset", offset);
  url.searchParams.append("limit", limit);

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "x-rapidapi-host": "active-jobs-db.p.rapidapi.com",
        "x-rapidapi-key": APIKEY
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    console.error("Error fetching jobs:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

