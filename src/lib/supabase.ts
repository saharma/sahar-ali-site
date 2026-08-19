import { getSecret } from "astro:env/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | undefined;

export function getSupabase(): SupabaseClient | null {
  if (client) return client;

  const url =
    getSecret("SUPABASE_URL") ||
    process.env.SUPABASE_URL ||
    import.meta.env.SUPABASE_URL ||
    import.meta.env.PUBLIC_SUPABASE_URL;
  const serviceRoleKey =
    getSecret("SUPABASE_SERVICE_ROLE_KEY") ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    console.error("newsletter: missing Supabase env", {
      hasUrl: Boolean(url),
      hasKey: Boolean(serviceRoleKey),
    });
    return null;
  }

  client = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
