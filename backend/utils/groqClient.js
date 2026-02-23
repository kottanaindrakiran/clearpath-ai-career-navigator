const Groq = require("groq-sdk");
const dotenv = require("dotenv");

dotenv.config();

const groqApiKey = process.env.GROQ_API_KEY;

if (!groqApiKey) {
    console.warn("Groq API Key is missing. Check your .env file.");
}

const groq = new Groq({ apiKey: groqApiKey || "placeholder" });

module.exports = groq;
