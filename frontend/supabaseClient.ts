// This file assumes the Supabase client is loaded via CDN in index.html
// and is available on the global window object.
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kwkngqkakgyxscxdvjor.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3a25ncWtha2d5eHNjeGR2am9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NTM0MjUsImV4cCI6MjA3MzQyOTQyNX0.t_UMUyY6NuFwUHA7ixzK85SzMjeUbpRfqpKbGQ_O6Tc';

// The Supabase client is created from the global object provided by the CDN script.
// @ts-ignore
export const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
