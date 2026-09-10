import express from 'express';
import path from 'path';
import app from './api/_app';

// Servidor local (Vite en desarrollo, estáticos en producción).
// En Vercel NO se usa: la API se publica como funciones en api/** que importan api/_app.ts.
const PORT = Number(process.env.PORT || 3000);
const appRoot = process.cwd();

async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: 3000,
        strictPort: true,
        hmr: {
          host: 'localhost',
          port: 24678,
          clientPort: 24678,
        },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(appRoot, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Wisdom School Server running on http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  start();
}

export default app;
