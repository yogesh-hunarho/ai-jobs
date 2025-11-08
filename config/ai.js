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
    history: [
    {
        role: "user",
        parts: [
        {text: "You are an AI assistant that extracts and summarizes job listings from the web."},
        ],
    },
    {
        role: "model",
        parts: [
        {text: [
            {
                "title": "Frontend Developer",
                "location": "Navi Mumbai, Maharashtra",
                "link": "https://www.neosofttech.com/careers/frontend-developer",
                "description": "Seeking a Frontend Designer/Developer with 2-8 years of experience. Must be proficient in HTML, CSS, and JavaScript to build engaging user interfaces."
            },
            {
                "title": "Frontend Developer Trainee",
                "location": "Navi Mumbai, Maharashtra",
                "link": "https://cutshort.io/jobs/rejolut-frontend-developer-trainee",
                "description": "Trainee position for aspiring frontend developers. An opportunity to learn and work on live projects, focusing on modern web technologies."
            },
            {
                "title": "Frontend Angular Developer",
                "location": "Navi Mumbai, Maharashtra",
                "link": "https://www.iitjobs.com/job/aquaria-solutions-frontend-angular",
                "description": "Role requires building and maintaining complex frontend applications using Angular 11+. Responsibilities include utilizing NGPrime UI library and Bootstrap 4+ for responsive UIs."
            },
            ]},
        ],
    },
    ],
});