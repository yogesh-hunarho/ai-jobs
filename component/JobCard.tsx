import React from "react";

export interface Job {
  id: string;
  title: string;
  organization: string;
  organization_logo?: string;
  url: string;
  external_apply_url?: string;
  recruiter_name?: string;
  linkedin_org_headquarters?: string;
  linkedin_org_industry?: string;
  date_posted?: string;
  countries_derived?: string[];
}

export default function JobCard({ job }: { job: Job }) {
  const posted = job.date_posted
    ? new Date(job.date_posted).toLocaleDateString()
    : "N/A";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 p-5 flex flex-col sm:flex-row gap-4">
      <div className="flex-shrink-0">
        {job.organization_logo ? (
          <img
            src={job.organization_logo}
            alt={job.organization}
            className="w-16 h-16 rounded-lg object-contain border"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            No Logo
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {job.title}
          </h3>
          <p className="text-gray-600">{job.organization}</p>
          {job.linkedin_org_headquarters && (
            <p className="text-sm text-gray-500">
              📍 {job.linkedin_org_headquarters}
            </p>
          )}
          {job.linkedin_org_industry && (
            <p className="text-sm text-gray-500">
              🏢 {job.linkedin_org_industry}
            </p>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between text-sm text-gray-400">
          <p>🕒 Posted: {posted}</p>
          <div className="flex gap-2">
            {job.external_apply_url && (
              <a
                href={job.external_apply_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:underline font-medium"
              >
                Apply
              </a>
            )}
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:underline"
            >
              View ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
