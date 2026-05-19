import {
  createClient
} from "https://esm.sh/@supabase/supabase-js@2";

// =========================
// SUPABASE CONFIG
// =========================

const supabaseUrl =
  "https://ooqbjzhgezkdxwhmxlxp.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vcWJqemhnZXprZHh3aG14bHhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxOTQ4MzcsImV4cCI6MjA5NDc3MDgzN30.5zAmVsS9FImD_BfJ8S6eSuX3rBVhuNYfjaPbUjOV-rE";

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
