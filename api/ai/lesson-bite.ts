import app from '../../server';

// Vercel Function: micro-lección individual con la jerarquía de IA del servidor.
export default function handler(req: any, res: any) {
  return (app as any)(req, res);
}
