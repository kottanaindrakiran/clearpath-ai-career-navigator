const express = require("express");
const router = express.Router();
const supabase = require("../utils/supabaseClient");
const groq = require("../utils/groqClient");

// Fallback JSON in case of API failure or timeout
const generateFallbackRoadmap = () => ({
    careerTitle: "Career guidance unavailable",
    whyThisFitsYou: "We're having trouble generating your roadmap right now due to high demand. Please try again in a few moments.",
    milestones: [],
    skillGaps: [],
    resources: [],
    actionPlan: []
});

// POST /api/generate-roadmap
router.post("/generate-roadmap", async (req, res) => {
    try {
        const { educationLevel, location, interests, challenges } = req.body;

        // Validate input
        if (!educationLevel || !location || !interests) {
            return res.status(400).json({ error: "Missing required fields: educationLevel, location, and interests are required." });
        }

        const prompt = `
You are an expert career advisor for underserved youth and people from low-income or rural backgrounds. 
Create a highly personalized, realistic career roadmap based on this profile:
- Education Level: ${educationLevel}
- Location: ${location}
- Interests: ${interests}
- Challenges: ${challenges || "None mentioned"}

STRICT RULES:
1. Provide a realistic career path focusing on accessible, high-demand skills (e.g., tech, digital skills, local trades).
2. Consider financial and geographic constraints strongly.
3. Suggest ONLY 100% FREE learning resources (e.g., freeCodeCamp, specific free YouTube channels, Coursera Financial Aid, open-source tools).
4. Create a practical 6-12 month step-by-step action plan.
5. Keep text concise, encouraging, and highly readable for UI cards (avoid long walls of text).
6. OUTPUT MUST BE ONLY VALID JSON. No extra context, no markdown wrappers like \`\`\`json. Just the raw JSON object.

REQUIRED JSON STRUCTURE:
{
  "careerTitle": "string (The specific job title)",
  "whyThisFitsYou": "string (2-3 sentences max on why this matches their interests and overcomes their challenges)",
  "milestones": [
    { "title": "string", "description": "string (Short sentence)" }
  ],
  "skillGaps": ["string", "string"],
  "resources": [
    { "title": "string", "url": "string (Must be a real URL starting with http/https)" }
  ],
  "actionPlan": [
    { "phase": "string (e.g., Month 1-2)", "duration": "string", "steps": ["string", "string"] }
  ]
}
`;

        // Timeout logic built-in to prevent hanging for too long during a demo
        const groqPromise = groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a JSON-only API. You must output perfectly formatted, parseable JSON matching the requested schema exactly. Never include conversational text. Never include markdown formatting.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama-3.1-8b-instant", // Fast, reliable, and active model
            temperature: 0.3, // Lower temp for more consistent JSON structure
            max_tokens: 1500,
            response_format: { type: "json_object" },
        });

        // 15 second timeout for the API call
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Groq API Timeout')), 15000));

        const chatCompletion = await Promise.race([groqPromise, timeoutPromise]);

        let aiContent = chatCompletion.choices[0]?.message?.content;

        if (!aiContent) {
            throw new Error("Received empty response from AI");
        }

        // Aggressive cleanup just in case
        aiContent = aiContent.trim().replace(/^```[a-z]*\n?/, "").replace(/\n?```$/, "").trim();

        let aiResponseJson;
        try {
            aiResponseJson = JSON.parse(aiContent);
        } catch (parseError) {
            console.error("Failed to parse Groq response:", aiContent);
            return res.status(200).json(generateFallbackRoadmap());
        }

        return res.status(200).json(aiResponseJson);

    } catch (error) {
        console.error("Error in /generate-roadmap:", error.message);
        // Graceful fallback for hackathon demo
        return res.status(200).json(generateFallbackRoadmap());
    }
});

// POST /api/save-roadmap
router.post("/save-roadmap", async (req, res) => {
    try {
        const { educationLevel, location, interests, challenges, aiResponse } = req.body;

        if (!educationLevel || !location || !interests || !aiResponse) {
            return res.status(400).json({ error: "Missing required fields." });
        }

        const { data, error } = await supabase
            .from("career_roadmaps")
            .insert([
                {
                    basic_info: { educationLevel, location },
                    interests: { rawInput: interests },
                    challenges: { rawInput: challenges || "None mentioned" },
                    ai_response: aiResponse,
                    career_title: aiResponse.careerTitle || "Unknown",
                    roadmap_summary: aiResponse.whyThisFitsYou || ""
                }
            ])
            .select("id, created_at")
            .single();

        if (error) {
            console.error("Supabase insert error:", error);
            return res.status(500).json({ error: "Failed to save roadmap to database." });
        }

        console.log(`[SUCCESS] Saved roadmap to Supabase. ID: ${data.id}, Created At: ${data.created_at}`);
        return res.status(200).json({ message: "Roadmap saved successfully", data });

    } catch (error) {
        console.error("Error in /save-roadmap:", error);
        return res.status(500).json({ error: "Internal server error while saving roadmap." });
    }
});

// GET /api/roadmap/:id
router.get("/roadmap/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from("career_roadmaps")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            console.error("Supabase fetch error:", error);
            return res.status(404).json({ error: "Roadmap not found." });
        }

        return res.status(200).json({
            id: data.id,
            educationLevel: data.education_level,
            location: data.location,
            interests: data.interests,
            challenges: data.challenges,
            aiResponse: data.ai_response,
            createdAt: data.created_at
        });

    } catch (error) {
        console.error("Error in /roadmap/:id:", error);
        return res.status(500).json({ error: "Internal server error while fetching roadmap." });
    }
});

// GET /api/test-roadmap (For hackathon demo backup)
router.get("/test-roadmap", (req, res) => {
    return res.status(200).json({
        "careerTitle": "Frontend Web Developer",
        "whyThisFitsYou": "Your interest in drawing and problem solving makes frontend development a perfect match. It's highly accessible to learn for free, works great with limited internet once tools are downloaded, and offers many remote opportunities from anywhere in the world.",
        "milestones": [
            { "title": "Learn HTML & CSS Fundamentals", "description": "Master building the structure and styling of basic web pages." },
            { "title": "Master JavaScript Basics", "description": "Learn exactly how to make a webpage interactive and dynamic." },
            { "title": "Build a Portfolio", "description": "Create 3 personal projects to show potential employers what you can do." }
        ],
        "skillGaps": ["HTML/CSS", "JavaScript", "React", "Git version control"],
        "resources": [
            { "title": "freeCodeCamp Responsive Web Design", "url": "https://www.freecodecamp.org/" },
            { "title": "The Odin Project", "url": "https://www.theodinproject.com/" },
            { "title": "MDN Web Docs", "url": "https://developer.mozilla.org/" }
        ],
        "actionPlan": [
            { "phase": "Months 1-2", "duration": "8 weeks", "steps": ["Complete freeCodeCamp HTML/CSS", "Build 2 static landing pages"] },
            { "phase": "Months 3-5", "duration": "12 weeks", "steps": ["Start learning JavaScript", "Build a calculator and a to-do list app"] },
            { "phase": "Month 6", "duration": "4 weeks", "steps": ["Create a portfolio website", "Start applying for junior remote roles or freelance gigs"] }
        ]
    });
});

// GET /api/verify-connections
router.get("/verify-connections", async (req, res) => {
    const status = {
        supabase: "testing",
        groq: "testing",
        errors: []
    };

    try {
        // 1. Test Supabase connection
        const { data: supabaseData, error: supabaseError } = await supabase
            .from('career_roadmaps')
            .select('id')
            .limit(1);

        if (supabaseError) {
            if (supabaseError.message.includes("schema cache") || (supabaseError.message.includes("relation") && supabaseError.message.includes("does not exist"))) {
                status.supabase = "connected (Warning: 'career_roadmaps' table not created yet)";
            } else {
                status.supabase = "failed";
                status.errors.push(`Supabase Error: ${supabaseError.message}`);
            }
        } else {
            status.supabase = "connected";
        }

        // 2. Test Groq Connection
        const groqPromise = groq.chat.completions.create({
            messages: [{ role: "user", content: "Say 'hello'" }],
            model: "llama-3.1-8b-instant",
            max_tokens: 5
        });

        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Groq Timeout')), 5000));

        try {
            await Promise.race([groqPromise, timeoutPromise]);
            status.groq = "connected";
        } catch (groqErr) {
            status.groq = "failed";
            status.errors.push(`Groq Error: ${groqErr.message}`);
        }

    } catch (err) {
        status.errors.push(`General Error: ${err.message}`);
    }

    return res.status(status.errors.length > 0 ? 500 : 200).json(status);
});

module.exports = router;
