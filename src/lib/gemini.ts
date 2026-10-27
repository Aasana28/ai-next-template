const BASE = "https://generativelanguage.googleapis.com/v1beta";
const DIMS = 768;

const modelName = () => process.env.EMBED_MODEL ?? "gemini-embedding-001";

export async function embedTexts(
  texts: string[],
  taskType: "RETRIEVAL_DOCUMENT" | "RETRIEVAL_QUERY" | "CLUSTERING" = "RETRIEVAL_DOCUMENT"
): Promise<number[][]> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY missing in .env.local");

  const out: number[][] = [];
  for (let i = 0; i < texts.length; i += 100) {
    const batch = texts.slice(i, i + 100);
    const res = await fetch(`${BASE}/models/${modelName()}:batchEmbedContents`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        requests: batch.map((t) => ({
          model: `models/${modelName()}`,
          content: { parts: [{ text: t }] },
          taskType,
          outputDimensionality: DIMS,
        })),
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 300)}`);
    }
    const data = await res.json();
    out.push(...data.embeddings.map((e: { values: number[] }) => e.values));
  }
  return out;
}

export async function embedQuery(text: string): Promise<number[]> {
  return (await embedTexts([text], "RETRIEVAL_QUERY"))[0];
}