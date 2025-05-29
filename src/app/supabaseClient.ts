import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ooaziodpseuwgmtgevog.supabase.co'; // Replace with your project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vYXppb2Rwc2V1d2dtdGdldm9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5ODU5MDgsImV4cCI6MjA2MzU2MTkwOH0.yluu9DlccVm2GoaNMByYGmtlF2qn_6A9Gh6VpmhSnWo'; // Replace with your anon public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
