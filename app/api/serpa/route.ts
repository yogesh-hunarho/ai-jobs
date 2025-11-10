import { NextResponse } from "next/server";

// https://rapidapi.com/fantastic-jobs-fantastic-jobs-default/api/internships-api/playground/apiendpoint_54fae4b2-d2ed-44f9-923d-2bd097ba9194

export async function GET(req: Request) {
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
    let filteredJobs = data;
    if (location) {
      filteredJobs = data.filter((job:any) => {
        const allLocations = job.locations_derived || [];
        return allLocations.some((loc:any) =>
          loc.toLowerCase().includes(location)
        );
      });
    }
    if (filteredJobs.length === 0) {
      return NextResponse.json({ message: "No jobs found", results: [] });
    }

    return NextResponse.json(filteredJobs);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
