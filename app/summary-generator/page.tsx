// "use client"
// import React, { useState } from "react";
// import { Sparkles, X, Check } from "lucide-react";

// export default function SummaryGenerator() {
//   const allSkills = [
//     "JavaScript", "TypeScript", "Python", "Java", "C++",
//     "React", "Vue.js", "Angular", "Node.js", "Express",
//     "HTML", "CSS", "Tailwind CSS", "Bootstrap",
//     "MongoDB", "PostgreSQL", "MySQL", "Redis",
//     "AWS", "Docker", "Kubernetes", "Git"
//   ];
  
//   const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
//   const [summary, setSummary] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const toggleSkill = (skill: string) => {
//     if (selectedSkills.includes(skill)) {
//       setSelectedSkills(selectedSkills.filter(s => s !== skill));
//     } else {
//       setSelectedSkills([...selectedSkills, skill]);
//     }
//   };

//   const removeSkill = (skill: string) => {
//     setSelectedSkills(selectedSkills.filter(s => s !== skill));
//   };

//   const generateSummary = async () => {
//     setLoading(true);
//     setSummary("");

//     try {
//       const res = await fetch("/api/summary", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ skills: selectedSkills }),
//       });

//       const data = await res.json();
//       console.log("data",data)
//     //   if (data?.data) {
//     //     setSummary(data.data);
//     //   } else {
//     //     setSummary("❌ Failed to generate summary. Please try again.");
//     //   }
//     } catch (err) {
//       setSummary("⚠️ Error generating summary. Please check your connection and try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
//       <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4">
//             <Sparkles className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">
//             AI Resume Summary Generator
//           </h1>
//           <p className="text-gray-600">
//             Select your skills and let AI craft the perfect professional summary
//           </p>
//         </div>

//         {/* Skills Selection */}
//         <div className="mb-6">
//           <label className="block text-sm font-semibold text-gray-700 mb-3">
//             Skills Dropdown
//           </label>
          
//           {/* Selected Skills Tags */}
//           {selectedSkills.length > 0 && (
//             <div className="flex flex-wrap gap-2 mb-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
//               {selectedSkills.map((skill) => (
//                 <span
//                   key={skill}
//                   className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
//                 >
//                   {skill}
//                   <button
//                     onClick={() => removeSkill(skill)}
//                     className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
//                   >
//                     <X className="w-3 h-3" />
//                   </button>
//                 </span>
//               ))}
//             </div>
//           )}

//           {/* Dropdown Button */}
//           <div className="relative">
//             <button
//               onClick={() => setShowDropdown(!showDropdown)}
//               className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-left hover:border-blue-400 focus:outline-none focus:border-blue-500 transition-colors bg-white"
//             >
//               <span className="text-gray-700">
//                 {selectedSkills.length === 0
//                   ? "Click to select skills..."
//                   : `${selectedSkills.length} skill${selectedSkills.length !== 1 ? 's' : ''} selected`}
//               </span>
//             </button>

//             {/* Dropdown Menu */}
//             {showDropdown && (
//               <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
//                 {allSkills.map((skill) => {
//                   const isSelected = selectedSkills.includes(skill);
//                   return (
//                     <button
//                       key={skill}
//                       onClick={() => toggleSkill(skill)}
//                       className="w-full px-4 py-2.5 text-left hover:bg-blue-50 flex items-center justify-between transition-colors"
//                     >
//                       <span className={isSelected ? "font-semibold text-blue-700" : "text-gray-700"}>
//                         {skill}
//                       </span>
//                       {isSelected && (
//                         <Check className="w-5 h-5 text-blue-600" />
//                       )}
//                     </button>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Generate Button */}
//         <button
//           onClick={generateSummary}
//           disabled={selectedSkills.length === 0 || loading}
//           className={`w-full py-4 rounded-lg font-semibold text-white transition-all transform ${
//             selectedSkills.length === 0 || loading
//               ? "bg-gray-300 cursor-not-allowed"
//               : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
//           }`}
//         >
//           {loading ? (
//             <span className="flex items-center justify-center gap-2">
//               <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                   fill="none"
//                 />
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 />
//               </svg>
//               Generating with AI...
//             </span>
//           ) : (
//             <span className="flex items-center justify-center gap-2">
//               <Sparkles className="w-5 h-5" />
//               Generate AI Suggestion
//             </span>
//           )}
//         </button>

//         {/* Generated Summary */}
//         {/* <div className="mt-8">
//           <label className="block text-sm font-semibold text-gray-700 mb-3">
//             Write profile summary
//           </label>
//           <div className="relative">
//             <textarea
//               value={summary}
//               onChange={(e) => setSummary(e.target.value)}
//               className=" text-black w-full border-2 border-gray-300 rounded-lg p-4 h-40 focus:outline-none focus:border-blue-500 transition-colors resize-none"
//               placeholder="Your AI-generated professional summary will appear here. You can also edit it manually..."
//             />
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// }


"use client"
import React, { useState } from "react";
import { Sparkles, X, Check } from "lucide-react";

export default function SummaryGenerator() {
  const allSkills = [
    "JavaScript", "TypeScript", "Python", "Java", "C++",
    "React", "Vue.js", "Angular", "Node.js", "Express",
    "HTML", "CSS", "Tailwind CSS", "Bootstrap",
    "MongoDB", "PostgreSQL", "MySQL", "Redis",
    "AWS", "Docker", "Kubernetes", "Git"
  ];
  
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [selectedSummary, setSelectedSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };

  const generateSummary = async () => {
    setLoading(true);
    setAiSuggestions([]);
    setSelectedSummary("");

    try {
      const res = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: selectedSkills }),
      });

      const data = await res.json();
      if (data?.data && Array.isArray(data.data)) {
        setAiSuggestions(data.data);
      } else {
        setAiSuggestions(["❌ Failed to generate summary. Please try again."]);
      }
    } catch (err) {
      setAiSuggestions(["⚠️ Error generating summary. Please check your connection and try again."]);
    } finally {
      setLoading(false);
    }
  };

  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  const selectSummary = (summary: string) => {
    setSelectedSummary(summary);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            AI Resume Summary Generator
          </h1>
          <p className="text-gray-600">
            Select your skills and let AI craft the perfect professional summary
          </p>
        </div>

        {/* Skills Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Skills Dropdown
          </label>
          
          {/* Selected Skills Tags */}
          {selectedSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              {selectedSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-left hover:border-blue-400 focus:outline-none focus:border-blue-500 transition-colors bg-white"
            >
              <span className="text-gray-700">
                {selectedSkills.length === 0
                  ? "Click to select skills..."
                  : `${selectedSkills.length} skill${selectedSkills.length !== 1 ? 's' : ''} selected`}
              </span>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                {allSkills.map((skill) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className="w-full px-4 py-2.5 text-left hover:bg-blue-50 flex items-center justify-between transition-colors"
                    >
                      <span className={isSelected ? "font-semibold text-blue-700" : "text-gray-700"}>
                        {skill}
                      </span>
                      {isSelected && (
                        <Check className="w-5 h-5 text-blue-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateSummary}
          disabled={selectedSkills.length === 0 || loading}
          className={`w-full py-4 rounded-lg font-semibold text-white transition-all transform ${
            selectedSkills.length === 0 || loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Generating with AI...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Generate AI Suggestion
            </span>
          )}
        </button>

        {/* AI Suggestions */}
        {aiSuggestions.length > 0 && (
          <div className="mt-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              AI Suggestions (Select one)
            </label>
            <div className="grid gap-3">
              {aiSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => selectSummary(suggestion)}
                  className={`text-left p-4 rounded-lg border-2 transition-all ${
                    selectedSummary === suggestion
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-blue-300 hover:shadow"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {truncateText(suggestion)}
                    </p>
                    {selectedSummary === suggestion && (
                      <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    )}
                  </div>
                  {suggestion.length > 120 && (
                    <span className="text-xs text-blue-600 mt-2 inline-block">
                      Click to view full summary below
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Generated Summary */}
        <div className="mt-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Write profile summary
          </label>
          <div className="relative">
            <textarea
              value={selectedSummary}
              onChange={(e) => setSelectedSummary(e.target.value)}
              className="w-full text-black border-2 border-gray-300 rounded-lg p-4 h-40 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              placeholder="Select an AI suggestion above or write your own professional summary..."
            />
            {selectedSummary && (
              <div className="absolute -top-3 right-1">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                  {aiSuggestions.includes(selectedSummary) ? "AI Generated" : "Custom"}
                </span>
              </div>
            )}
          </div>
          {selectedSummary && (
            <p className="mt-2 text-sm text-gray-500">
              Feel free to edit and customize the summary above
            </p>
          )}
        </div>
      </div>
    </div>
  );
}