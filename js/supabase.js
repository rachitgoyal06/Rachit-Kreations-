// ============================================
// RACHIT KREATIONS — Supabase Configuration
// ============================================
// ⚠️ FILL IN YOUR SUPABASE CREDENTIALS BELOW
// Get them from: https://supabase.com/dashboard → Your Project → Settings → API

const SUPABASE_URL  = "YOUR_SUPABASE_URL";   // e.g. https://xyzxyz.supabase.co
const SUPABASE_ANON = "YOUR_SUPABASE_ANON_KEY"; // long eyJhbG... key

// Initialize Supabase client (available globally as `supabaseClient`)
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
