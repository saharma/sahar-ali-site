import { getSupabase } from "./supabase";

export interface CollabEnquiry {
  name: string;
  brand: string;
  email: string;
  collabType: string;
  message: string;
}

export type EnquiryResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "unavailable" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 120, brand: 160, email: 200, collabType: 80, message: 4000 };

export async function addEnquiry(input: Partial<CollabEnquiry>): Promise<EnquiryResult> {
  const name = (input.name ?? "").trim();
  const brand = (input.brand ?? "").trim();
  const email = (input.email ?? "").trim().toLowerCase();
  const collabType = (input.collabType ?? "").trim();
  const message = (input.message ?? "").trim();

  if (!name || !message || !collabType) return { ok: false, reason: "invalid" };
  if (!EMAIL_RE.test(email)) return { ok: false, reason: "invalid" };
  if (
    name.length > MAX.name ||
    brand.length > MAX.brand ||
    email.length > MAX.email ||
    collabType.length > MAX.collabType ||
    message.length > MAX.message
  ) {
    return { ok: false, reason: "invalid" };
  }

  const supabase = getSupabase();
  if (!supabase) return { ok: false, reason: "unavailable" };

  const { error } = await supabase.from("collab_enquiries").insert({
    name,
    brand: brand || null,
    email,
    collab_type: collabType,
    message,
  });

  if (!error) return { ok: true };

  console.error("collab enquiry insert failed", {
    code: error.code,
    message: error.message,
  });
  return { ok: false, reason: "unavailable" };
}
