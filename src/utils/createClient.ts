import { createClient } from "@supabase/supabase-js";
import { env } from "../env/server.mjs";

const supabaseURL = "https://zrohxlcjhxpnojvxpcju.supabase.co";
const supabaseKEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyb2h4bGNqaHhwbm9qdnhwY2p1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUyNTgwODQsImV4cCI6MTk4MDgzNDA4NH0.2P0uiDd47u_1AZXP6khtBiGv3q0AcDvzWbWrOLQiis8";

const supabase = createClient(supabaseURL, supabaseKEY);

export default supabase;
