import { NextResponse, connection } from "next/server";
import { chat } from "@/lib/groq";
import { embedQuery } from "@/lib/gemini";

export const maxDuration = 60;

export async function GET() {
  await connection();
  const result: Record<string, unknown> = {};

  try {
    const reply = await chat(
      [{ role: "user", content: "Reply with exactly: Groq OK" }],
      { maxTokens: 300 }
    );
    result.groq = { ok: true, model: process.env.GROQ_MODEL, reply: reply.trim() };
  } catch (e) {
    result.groq = { ok: false, error: e instanceof Error ? e.message : String(e) };
  }

  try {
    const v = await embedQuery("hello world");
    result.gemini = { ok: true, dimensions: v.length };
  } catch (e) {
    result.gemini = { ok: false, error: e instanceof Error ? e.message : String(e) };
  }

  return NextResponse.json(result);
}