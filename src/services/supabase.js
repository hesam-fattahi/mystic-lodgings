import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://vgyfnziuewdyfvsopygo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZneWZueml1ZXdkeWZ2c29weWdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA4NjM3MjAsImV4cCI6MjAzNjQzOTcyMH0.PpwjToXcB3ylico3tlhGOhMcn89VNJjraa6Ga73c5H4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
