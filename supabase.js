import {
  createClient
} from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl =
  "https://ooqbjzhgezkdxwhmxlxp.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vcWJqemhnZXprZHh3aG14bHhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxOTQ4MzcsImV4cCI6MjA5NDc3MDgzN30.5zAmVsS9FImD_BfJ8S6eSuX3rBVhuNYfjaPbUjOV-rE";

export const supabase =
  createClient(
    supabaseUrl,
    supabaseKey,
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
