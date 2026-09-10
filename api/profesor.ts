import app from './_app';

// Vercel Function: endpoint legacy del profesor IA (misma jerarquía de servidor).
export default function handler(req: any, res: any) {
  return (app as any)(req, res);
}
