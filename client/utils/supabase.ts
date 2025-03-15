import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseKey) {
	throw new Error('supabaseKey is required. Please check your environment variables.');
}
if (!supabaseUrl) {
	throw new Error('supabaseUrl is required. Please check your environment variables.');
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;