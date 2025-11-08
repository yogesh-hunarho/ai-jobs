"use client";
import React from "react";

interface LoadingSpinnerProps {
  size?: number; // size in pixels
  color?: string; // tailwind color name (e.g., "sky", "blue", "emerald")
  label?: string; // optional text label like "Loading..."
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 12,
  color = "sky",
  label,
}) => {
  return (
    <div className="flex items-center gap-2">
      <span
        className="relative flex"
        style={{ width: size, height: size }}
      >
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-${color}-400 opacity-75`}
        ></span>
        <span
          className={`relative inline-flex rounded-full bg-${color}-500`}
          style={{ width: size, height: size }}
        ></span>
      </span>

      {label && (
        <span className="text-sm text-gray-600 font-medium">{label}</span>
      )}
    </div>
  );
};

export default LoadingSpinner;
