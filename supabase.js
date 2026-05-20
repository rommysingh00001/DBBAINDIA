import {
  createClient
} from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl =
  "https://qfzqojxaulnsfkueruma.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmenFvanhhdWxuc2ZrdWVydW1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNDU0NjQsImV4cCI6MjA5NDgyMTQ2NH0.ex916yESycJdbiw7bna7z_utLWjXxUEoWbXR9cx_QpI";

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
