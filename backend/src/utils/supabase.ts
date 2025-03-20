import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseKey) {
	throw new Error('supabaseKey is required. Please check your environment variables.');
}

if (!supabaseUrl) {
	throw new Error('supabaseUrl is required. Please check your environment variables.');
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

if(supabase){
	console.log('Supabase client created successfully');
} else {
	console.log('Supabase client creation failed');
}

export default supabase;