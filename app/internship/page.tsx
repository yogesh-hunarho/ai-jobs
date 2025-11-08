"use client";
import React, { useState, useEffect } from "react";
import JobCard, { Job } from "@/component/JobCard";

export default function Page() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("India");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/serpa?title=${encodeURIComponent(title)}&location=${encodeURIComponent(location)}&offset=${offset}`
      );
      const data = await res.json();
      setJobs(data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    setOffset(0);
    fetchJobs();
  };

  useEffect(() => {
    // fetch on pagination change
    if (offset !== 0) fetchJobs();
  }, [offset]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          type="text"
          placeholder="e.g. React Developer"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 flex-1"
        />
        <input
          type="text"
          placeholder="e.g. Mumbai"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-lg font-medium"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Job List */}
      {loading ? (
        <p className="text-gray-500">Loading jobs...</p>
      ) : jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No jobs found.</p>
      )}

      {/* Pagination */}
      {jobs.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={offset === 0}
            onClick={() => setOffset((o) => Math.max(0, o - 10))}
            className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 disabled:opacity-40"
          >
            ⬅ Prev
          </button>
          <span className="text-gray-600">Page {offset / 10 + 1}</span>
          <button
            onClick={() => setOffset((o) => o + 10)}
            className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
}
