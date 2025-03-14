import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';
import 'dotenv/config';

const supabaseUrl = 'https://bomeixrxkrcvgbljgatb.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
	throw new Error('supabaseKey is required. Please check your environment variables.');
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;