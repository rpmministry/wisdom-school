import app from '../_app';

// Vercel Function: reexplicación afectuosa con la jerarquía de IA del servidor.
export default function handler(req: any, res: any) {
  return (app as any)(req, res);
}
