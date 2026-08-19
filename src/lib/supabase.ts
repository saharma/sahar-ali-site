import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function readEnv(name: string): string | undefined {
  const fromImportMeta = (import.meta.env as Record<string, string | undefined>)[
    name
  ];
  const fromProcess =
    typeof process !== "undefined" ? process.env[name] : undefined;
  return fromImportMeta || fromProcess;
}

let client: SupabaseClient | undefined;

export function getSupabase(): SupabaseClient | null {
  if (client) return client;

  const url =
    readEnv("SUPABASE_URL") ||
    readEnv("PUBLIC_SUPABASE_URL") ||
    readEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = readEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !serviceRoleKey) return null;

  client = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
