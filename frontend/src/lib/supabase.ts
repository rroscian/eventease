import { createClient } from '@supabase/supabase-js';

const createSupabaseClient = () => {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Missing Supabase environment variables');
      return createMockClient();
    }

    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Supabase initialization error:', error);
    return createMockClient();
  }
};

const createMockClient = () => ({
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } }, error: null }),
    signInWithPassword: async () => ({ data: null, error: new Error('Supabase not configured') }),
    signUp: async () => ({ data: null, error: new Error('Supabase not configured') }),
    signOut: async () => ({ error: null })
  }
});

export const supabase = createSupabaseClient();