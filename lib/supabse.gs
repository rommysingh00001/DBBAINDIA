import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://meqzyznfpiqitdrxsxax.supabase.co/rest/v1/';
const supabaseKey = 'sb_publishable_UX18XHfoD65kZ2lrBtF9xg_CoYJFLo7';

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
