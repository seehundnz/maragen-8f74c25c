import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/tts")({
  staticData: { sitemap: false },
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
              "Read this maritime VHF radio message as a professional coast-station radio operator: slowly, clearly, and calmly. Pronounce all numbers and digits individually and distinctly. Spell out the vessel's call sign using the NATO phonetic alphabet (Alpha, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliett, Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-ray, Yankee, Zulu). Read the vessel name, position coordinates and MMSI slowly, pausing between each element. Pause briefly at the end of each line.",
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
