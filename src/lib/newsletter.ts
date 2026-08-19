import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type Signup = { email: string; signedUpAt: string };

const FILE = path.join(process.cwd(), "data", "newsletter-signups.json");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Store = typeof globalThis & { __newsletterSignups?: Signup[] };

function memory(): Signup[] {
  const g = globalThis as Store;
  if (!g.__newsletterSignups) g.__newsletterSignups = [];
  return g.__newsletterSignups;
}

async function loadFromDisk(): Promise<Signup[]> {
  try {
    const raw = await readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as Signup[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function saveToDisk(signups: Signup[]): Promise<void> {
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(signups, null, 2) + "\n");
}

export async function addSignup(
  email: string,
): Promise<{ ok: true } | { ok: false; reason: "invalid" | "duplicate" }> {
  const normalised = email.trim().toLowerCase();
  if (!EMAIL_RE.test(normalised)) return { ok: false, reason: "invalid" };

  const fromDisk = await loadFromDisk();
  const list = memory();
  if (fromDisk.length && list.length === 0) list.push(...fromDisk);

  if (list.some((s) => s.email === normalised)) {
    return { ok: false, reason: "duplicate" };
  }

  list.push({ email: normalised, signedUpAt: new Date().toISOString() });
  try {
    await saveToDisk(list);
  } catch {
    // Serverless filesystems are often read-only. Memory still holds the list
    // until the instance recycles; swap this for a real store later.
  }
  return { ok: true };
}
