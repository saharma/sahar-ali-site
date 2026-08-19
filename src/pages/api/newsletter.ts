import type { APIRoute } from "astro";
import { addSignup } from "../../lib/newsletter";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let email = "";
  const contentType = request.headers.get("content-type") ?? "";

  try {
    if (contentType.includes("application/json")) {
      const body = (await request.json()) as { email?: string };
      email = body.email ?? "";
    } else {
      const form = await request.formData();
      email = String(form.get("email") ?? "");
    }
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const result = await addSignup(email);
  if (!result.ok) {
    const status =
      result.reason === "duplicate" ? 409 : result.reason === "unavailable" ? 503 : 400;
    return Response.json({ ok: false, error: result.reason }, { status });
  }

  return Response.json({ ok: true });
};
