import app from '../../server';

// Vercel Function: delega en la app Express compartida (server.ts) para reutilizar
// la jerarquía de IA (DeepSeek -> OpenRouter free -> OpenCode -> Gemini).
export default function handler(req: any, res: any) {
  return (app as any)(req, res);
}
