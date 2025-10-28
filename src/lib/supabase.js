import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://okvoijqxzqniyyyjokhe.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rdm9panF4enFuaXl5eWpva2hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MTQ5OTQsImV4cCI6MjA3NzE5MDk5NH0.0nM5h1rE25H4P3aDc6nzkAVe_WUI59nODvTXOexc2kg';

let supabase;

try {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} catch (error) {
  console.error('Error creating Supabase client:', error);
}

export { supabase };

