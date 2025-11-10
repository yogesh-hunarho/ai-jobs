import { JobListAI } from "@/config/ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const { skills } = await req.json();

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return NextResponse.json({ error: "No skills provided" }, { status: 400 });
    }
    try {

        const SummaryPrompt = `
        Generate a 250-character professional resume summary for a student highlighting their technical and soft skills. 
        The student's skills are: ${skills.join(", ")}. 
        The tone should be confident and beginner-friendly, suitable for a resume headline.
        Return 2 or more the summary text without any extra explanation.
        Response Format: ["your first response","your second response"]
        `;

        const aiResponse = await JobListAI.sendMessage(SummaryPrompt)
        const aiResult = JSON.parse(aiResponse.response.text())

        return NextResponse.json({data: aiResult,message: true }, { status:200 })


    } catch (error) {
        return NextResponse.json({error: error}, { status : 500})
    }
}