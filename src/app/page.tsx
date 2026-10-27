import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl">AI Project Template</CardTitle>
            <Badge variant="secondary">Ready</Badge>
          </div>
          <CardDescription>
            Next.js + Tailwind + shadcn/ui, with Groq and Gemini helpers.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button style={{ backgroundColor: "#2F6F6B" }}>Primary action</Button>
          <Button variant="outline">Secondary</Button>
        </CardContent>
      </Card>
    </main>
  );
}