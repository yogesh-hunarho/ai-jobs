"use client";
import LoadingSpinner from "@/component/loading";
import Link from "next/link";
import React, { useState, FormEvent } from "react";

interface Job {
  title: string;
  location: string;
  link: string;
  description: string;
}

interface ApiResponse {
  success: boolean;
  response?: {
    jobs: Job[];
  };
  error?: string;
}

export default function JobSearch() {
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setJobs([]);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, location }),
      });

      const data: ApiResponse = await res.json();

      if (data.success && data.response?.jobs) {
        setJobs(data.response.jobs);
      } else {
        throw new Error(data.error || "No jobs found");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">AI Job Finder</h1>
      <Link href={'/internship'}>View Internship</Link>
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-3 mb-6"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Frontend Developer"
          required
          className="border p-2 rounded w-full sm:flex-1"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Navi Mumbai"
          required
          className="border p-2 rounded w-full sm:flex-1"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Searching..." : "Find Jobs"}
        </button>
      </form>

      {error && (
        <p className="text-red-600 text-center mb-4">
          ⚠️ {error}
        </p>
      )}

      {loading && 
      <LoadingSpinner size={20} color="emerald" label="Fetching Jobs..." />
      }

      <div className="grid gap-4">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className=" text-sm mb-2">{job.location}</p>
            <p className="mb-3">{job.description}</p>
            <a
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              View Job →
            </a>
          </div>
        ))}
      </div>

      {/* No results */}
      {!loading && !error && jobs.length === 0 && (
        <p className="text-gray-500 text-center mt-4">
          Enter a title and location to find jobs.
        </p>
      )}
    </div>
  );
}
