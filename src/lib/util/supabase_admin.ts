import { SUPABASE_PRIVATE_KEY } from "$env/static/private";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";
import { createClient } from "@supabase/auth-helpers-sveltekit";

export const admin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_PRIVATE_KEY);