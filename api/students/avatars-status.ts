import app from '../../server';

// Vercel Function: estado de avatares disponibles por estudiante.
export default function handler(req: any, res: any) {
  return (app as any)(req, res);
}
