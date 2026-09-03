import type { APIRoute } from "astro";
import { addEnquiry, type CollabEnquiry } from "../../lib/collab";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let payload: Partial<CollabEnquiry> = {};
  const contentType = request.headers.get("content-type") ?? "";

  try {
    if (contentType.includes("application/json")) {
      payload = (await request.json()) as Partial<CollabEnquiry>;
    } else {
      const form = await request.formData();
      payload = {
        name: String(form.get("name") ?? ""),
        brand: String(form.get("brand") ?? ""),
        email: String(form.get("email") ?? ""),
        collabType: String(form.get("collabType") ?? ""),
        message: String(form.get("message") ?? ""),
      };
    }
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const result = await addEnquiry(payload);
  if (!result.ok) {
    return Response.json(
      { ok: false, error: result.reason },
      { status: result.reason === "unavailable" ? 503 : 400 }
    );
  }

  return Response.json({ ok: true });
};
