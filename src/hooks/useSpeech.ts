import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Speaks a radio script aloud.
 * Primary: high quality voice generated on the server.
 * Fallback: the device's built-in speech synthesis (works offline at sea).
 */
export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string | null>(null);

  const cleanup = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const stop = useCallback(() => {
    cleanup();
    setSpeaking(false);
    setLoading(false);
  }, [cleanup]);

  useEffect(() => cleanup, [cleanup]);

  const speakLocally = useCallback((text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.rate = 0.9;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    return true;
  }, []);

  const speak = useCallback(
    async (text: string) => {
      cleanup();
      const spoken = text.replace(/\[([^\]]+)\]/g, "$1 unknown");
      setLoading(true);
      setSpeaking(true);
      try {
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: spoken }),
        });
        if (!res.ok) throw new Error(await res.text().catch(() => "tts failed"));
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        urlRef.current = url;
        const audio = new Audio(url);
        audioRef.current = audio;
        audio.onended = () => setSpeaking(false);
        audio.onerror = () => setSpeaking(false);
        await audio.play();
        setLoading(false);
        return { fallback: false as const };
      } catch {
        setLoading(false);
        const ok = speakLocally(spoken);
        if (!ok) setSpeaking(false);
        return { fallback: ok, failed: !ok } as const;
      }
    },
    [cleanup, speakLocally],
  );

  return { speak, stop, speaking, loading };
}
