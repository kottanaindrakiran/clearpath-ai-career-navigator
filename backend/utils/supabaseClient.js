const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.warn("Supabase URL or Key is missing. Check your .env file.");
}

// We use the service role key for backend operations to bypass RLS if necessary,
// or anon key if no service key is provided (for simple MVP purposes).
const supabase = createClient(supabaseUrl || "https://placeholder.supabase.co", supabaseServiceKey || "placeholder");

module.exports = supabase;
