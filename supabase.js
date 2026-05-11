// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://meqzyznfpiqitdrxsxax.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lcXp5em5mcGlxaXRkcnhzeGF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxODQxNTgsImV4cCI6MjA5Mzc2MDE1OH0.IU0Q_EE3-6ozwhxJN5VVMWTDS00hYGbHm751yH2c47c';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY); {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
    // ✅ Remove flowType for email/password signup
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});
