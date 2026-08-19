import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/tts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) {
          return new Response("Voice service not configured", { status: 500 });
        }

        let text = "";
        try {
          const body = (await request.json()) as { text?: unknown };
          if (typeof body.text === "string") text = body.text.trim();
        } catch {
          return new Response("Invalid request body", { status: 400 });
        }
        if (!text) return new Response("Missing text", { status: 400 });
        if (text.length > 4000) text = text.slice(0, 4000);

        const response = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-4o-mini-tts",
            input: text,
            voice: "alloy",
            speed: 0.8,
            response_format: "mp3",
            instructions:
              "Read this maritime VHF radio message in a calm, neutral, professional radio-operator voice. Speak slowly and clearly. Pronounce all numbers individually and distinctly. Read the vessel name slowly and clearly. Spell the call sign using the NATO phonetic alphabet (Alpha, Bravo, Charlie, etc.), then repeat each letter. Pause briefly at the end of each line and between major sections.",
          }),
        });

        if (!response.ok) {
          const detail = await response.text().catch(() => "");
          console.error(`TTS failed [${response.status}]: ${detail}`);
          return new Response(detail || "Voice generation failed", {
            status: response.status,
          });
        }

        return new Response(response.body, {
          headers: {
            "Content-Type": "audio/mpeg",
            "Cache-Control": "no-store",
          },
        });
      },
    },
  },
});
