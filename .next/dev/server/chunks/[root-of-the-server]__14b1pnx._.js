module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/src/app/api/profesor/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@google/generative-ai/dist/index.mjs [app-route] (ecmascript)");
;
;
const genAI = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](process.env.GEMINI_API_KEY || '');
async function POST(req) {
    try {
        const { preguntaEstudiante, asignatura, estudiante, temaDia, historialConversacion = [] } = await req.json();
        const systemPrompt = `
      Eres un tutor de élite en Wisdom School. 
      Estudiante: ${estudiante}. 
      Asignatura: ${asignatura}. 
      Tema del día: ${temaDia || 'Exploración general'}. 
      
      FILOSOFÍA DE WISDOM SCHOOL:
      1. Método Socrático: NUNCA des la respuesta directa. Guía con preguntas reflexivas. Si hace una pregunta, responde con otra pregunta que lo haga pensar.
      2. Método Montessori: Fomenta la autonomía. Sugiere experimentos prácticos o uso de objetos físicos si es posible.
      3. Método Charlotte Mason: Usa un tono narrativo, apasionado, de 'Libro Vivo'.
      
      TONO: ${estudiante === 'Gael' ? 'Dinámico, aventurero, analogías de juegos/aventura.' : 'Empático, intelectual, tratándola como una joven investigadora.'}
    `;
        // Fase 1: Búsqueda dinámica de modelos gratuitos en OpenRouter
        let freeModels = [];
        if (process.env.OPENROUTER_API_KEY) {
            try {
                const modelsRes = await fetch('https://openrouter.ai/api/v1/models');
                if (modelsRes.ok) {
                    const { data } = await modelsRes.json();
                    freeModels = data.filter((m)=>m.id.endsWith(':free')).map((m)=>m.id).slice(0, 3);
                }
            } catch (e) {
                console.warn("Error buscando modelos en OpenRouter:", e);
            }
        }
        // Fase 2: Iterar sobre los modelos gratuitos obtenidos
        for (const modelId of freeModels){
            const controller = new AbortController();
            const timeoutId = setTimeout(()=>controller.abort(), 8000);
            try {
                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                        "Content-Type": "application/json",
                        "HTTP-Referer": "http://localhost:3000",
                        "X-Title": "Wisdom School"
                    },
                    body: JSON.stringify({
                        model: modelId,
                        messages: [
                            {
                                role: "system",
                                content: systemPrompt
                            },
                            ...historialConversacion.map((m)=>({
                                    role: m.role === 'estudiante' ? 'user' : 'assistant',
                                    content: m.texto
                                })),
                            {
                                role: "user",
                                content: preguntaEstudiante
                            }
                        ]
                    }),
                    signal: controller.signal
                });
                clearTimeout(timeoutId);
                if (response.ok) {
                    const data = await response.json();
                    if (data.choices?.[0]?.message?.content) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            respuesta: data.choices[0].message.content
                        });
                    }
                }
            } catch (err) {
                clearTimeout(timeoutId);
                console.warn(`Modelo de OpenRouter ${modelId} falló o expiró. Intentando el siguiente...`);
            }
            // Delay de 1 segundo entre reintentos para evitar rate limit
            await new Promise((resolve)=>setTimeout(resolve, 1000));
        }
        // Fase 3: Fallback de Seguridad a Gemini 3.7 Flash
        try {
            const model = genAI.getGenerativeModel({
                model: "gemini-3.7-flash",
                systemInstruction: systemPrompt
            });
            const chat = model.startChat({
                history: historialConversacion.map((m)=>({
                        role: m.role === 'estudiante' ? 'user' : 'model',
                        parts: [
                            {
                                text: m.texto
                            }
                        ]
                    }))
            });
            const result = await chat.sendMessage(preguntaEstudiante);
            const text = result.response.text();
            if (text) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    respuesta: text
                });
            }
        } catch (fallbackErr) {
            console.error("Gemini 3.7 Fallback falló:", fallbackErr);
        }
        // Manejo de Errores Final (503)
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Disculpa, estoy organizando mis apuntes. ¿Podrías repetirme tu pregunta en unos segundos?"
        }, {
            status: 503
        });
    } catch (error) {
        console.error("Error general en API:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Error interno del servidor"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__14b1pnx._.js.map