import {
  createClient
} from "https://esm.sh/@supabase/supabase-js@2";

// =========================
// SUPABASE CONFIG
// =========================

const supabaseUrl =
  "https://meqzyznfpiqitdrxsxax.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lcXp5em5mcGlxaXRkcnhzeGF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxODQxNTgsImV4cCI6MjA5Mzc2MDE1OH0.IU0Q_EE3-6ozwhxJN5VVMWTDS00hYGbHm751yH2c47c";

// =========================
// CREATE CLIENT
// =========================

export const supabase =
  createClient(
    supabaseUrl,
    supabaseAnonKey,
    {

      auth: {

        persistSession: true,

        autoRefreshToken: true,

        detectSessionInUrl: true,

        flowType: "pkce",

        storage: window.localStorage

      },

      realtime: {

        params: {

          eventsPerSecond: 10

        }

      }

    }
  );

// =========================
// SESSION CHECK
// =========================

const {
  data: { session }
} = await supabase.auth.getSession();

console.log("Current Session:", session);

// =========================
// AUTH STATE LISTENER
// =========================

supabase.auth.onAuthStateChange(
  (event, session) => {

    console.log(
      "Auth Event:",
      event
    );

    console.log(
      "Session:",
      session
    );

  }
);
