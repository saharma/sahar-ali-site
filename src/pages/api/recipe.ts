import type { APIRoute } from "astro";
import { getSecret } from "astro:env/server";

export const prerender = false;

const schema = {
  type: "object",
  additionalProperties: false,
  required: ["title", "description", "servings", "prepTime", "cookTime", "ingredients", "steps", "notes"],
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    servings: { type: "integer", minimum: 1, maximum: 30 },
    prepTime: { type: "string" },
    cookTime: { type: "string" },
    ingredients: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["amount", "item"],
        properties: { amount: { type: "string" }, item: { type: "string" } },
      },
    },
    steps: { type: "array", items: { type: "string" } },
    notes: { type: "array", items: { type: "string" } },
  },
};

function readText(data: any): string | undefined {
  for (const item of data?.output ?? []) {
    for (const content of item?.content ?? []) {
      if (content?.type === "output_text" && content.text) return content.text;
    }
  }
}

export const POST: APIRoute = async ({ request }) => {
  const apiKey = getSecret("OPENAI_API_KEY") || process.env.OPENAI_API_KEY || import.meta.env.OPENAI_API_KEY;
  if (!apiKey) return Response.json({ error: "Recipe Maker is not connected yet." }, { status: 503 });

  let body: { query?: string; servings?: number; recipe?: unknown; instruction?: string };
  try { body = await request.json(); }
  catch { return Response.json({ error: "That request could not be read." }, { status: 400 }); }

  const servings = Math.max(1, Math.min(30, Number(body.servings) || 4));
  const isAdaptation = Boolean(body.recipe && body.instruction?.trim());
  const query = String(body.query ?? "").trim().slice(0, 500);
  const instruction = String(body.instruction ?? "").trim().slice(0, 500);
  if (!isAdaptation && !query) return Response.json({ error: "Tell me what you want to cook." }, { status: 400 });

  const input = isAdaptation
    ? `Adapt the recipe below to follow the user's request. Recalculate every affected quantity, preserve food safety, and keep the result practical.\n\nUSER REQUEST: ${instruction}\n\nCURRENT RECIPE: ${JSON.stringify(body.recipe).slice(0, 12000)}`
    : `Create a dependable, original recipe for: ${query}. Make exactly ${servings} servings. Use clear measurements and concise numbered steps. Include practical substitution or storage notes.`;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "gpt-5.4-mini",
      store: false,
      instructions: "You are a careful recipe developer. Return only valid recipe data matching the supplied schema. Never invent unsafe cooking guidance. Account for allergies or dietary requests explicitly mentioned by the user.",
      input,
      text: { format: { type: "json_schema", name: "recipe", strict: true, schema } },
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    console.error("recipe: OpenAI error", data?.error?.code ?? response.status);
    return Response.json({ error: "The kitchen is busy right now. Please try again." }, { status: 502 });
  }

  try {
    const text = readText(data);
    if (!text) throw new Error("missing output");
    return Response.json({ recipe: JSON.parse(text) });
  } catch {
    return Response.json({ error: "The recipe came back incomplete. Please try again." }, { status: 502 });
  }
};
