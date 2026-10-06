// gemini.ts: connects the dashboard to Gemini (used in Google AI Studio Build mode).
// index.html calls window.routeWithGemini(prompt) and expects text back.
// Never commit a real API key: AI Studio supplies it at runtime.
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

(window as any).routeWithGemini = async (prompt: string): Promise<string> => {
  const res = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: prompt,
    config: { responseMimeType: "application/json" },
  });
  return res.text ?? "";
};
