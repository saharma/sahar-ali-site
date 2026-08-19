import { getSupabase } from "./supabase";

export type SignupResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "duplicate" | "unavailable" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function addSignup(email: string): Promise<SignupResult> {
  const normalised = email.trim().toLowerCase();
  if (!EMAIL_RE.test(normalised)) return { ok: false, reason: "invalid" };

  const supabase = getSupabase();
  if (!supabase) return { ok: false, reason: "unavailable" };

  const { error } = await supabase.from("newsletter_signups").insert({
    email: normalised,
  });

  if (!error) return { ok: true };
  if (error.code === "23505") return { ok: false, reason: "duplicate" };

  console.error("newsletter insert failed", {
    code: error.code,
    message: error.message,
  });
  return { ok: false, reason: "unavailable" };
}
