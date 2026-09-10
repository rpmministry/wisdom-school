import app from './_app';

// Vercel Function: envío del PIN de acceso por correo (nodemailer).
export default function handler(req: any, res: any) {
  return (app as any)(req, res);
}
