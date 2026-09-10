import app from '../server';

// Vercel Function: health check que reporta qué capas de IA están configuradas
// (DeepSeek, OpenRouter, OpenCode, Gemini) y la jerarquía resultante.
export default function handler(req: any, res: any) {
  return (app as any)(req, res);
}
