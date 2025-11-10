const { GoogleGenerativeAI } = require("@google/generative-ai");
  
const apiKey = "AIzaSyAhJDmV9ev_WAJ7xBAt5PM1wGRDIq6Pmu0";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};
  
export const JobListAI= model.startChat({
    generationConfig,
});