import app from '../_app';

// Vercel Function: estado de avatares disponibles por estudiante.
export default function handler(req: any, res: any) {
  return (app as any)(req, res);
}
