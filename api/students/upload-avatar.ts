import app from '../../server';

// Vercel Function: guarda la foto del estudiante. En serverless el FS es de solo
// lectura, por lo que el endpoint devuelve error controlado; el avatar local sigue
// funcionando vía localStorage en el cliente.
export default function handler(req: any, res: any) {
  return (app as any)(req, res);
}
