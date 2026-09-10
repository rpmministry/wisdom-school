import app from '../server';

// Vercel Function: envío del PIN de acceso por correo (nodemailer).
export default function handler(req: any, res: any) {
  return (app as any)(req, res);
}
