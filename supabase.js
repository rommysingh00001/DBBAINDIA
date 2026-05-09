import {
  createClient
} from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl =
  "https://meqzyznfpiqitdrxsxax.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lcXp5em5mcGlxaXRkcnhzeGF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxODQxNTgsImV4cCI6MjA5Mzc2MDE1OH0.IU0Q_EE3-6ozwhxJN5VVMWTDS00hYGbHm751yH2c47c";

export const supabase =
  createClient(
    supabaseUrl,
    supabaseKey
  );
