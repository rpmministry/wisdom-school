// Entry de la función serverless de Vercel.
// Es JS CommonJS a propósito: así Vercel NO compila TypeScript para esta función
// (esa compilación era la que provocaba FUNCTION_INVOCATION_FAILED).
// `api-server.js` se genera con `npm run build` a partir de `server.ts`.
const mod = require('./api-server.js');
module.exports = mod && mod.default ? mod.default : mod;
