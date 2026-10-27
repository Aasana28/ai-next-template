export function cosine(a: number[], b: number[]): number {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1);
}

export function topK<T extends { embedding: number[] }>(
  query: number[],
  items: T[],
  k = 4
): (T & { score: number })[] {
  return items
    .map((it) => ({ ...it, score: cosine(query, it.embedding) }))
    .sort((x, y) => y.score - x.score)
    .slice(0, k);
}