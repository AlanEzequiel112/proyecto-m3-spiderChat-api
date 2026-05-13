const FALLBACK_REPLIES = [
  "Mis sensores arácnidos están algo confundidos 🕷️",
  "Nueva York está caótica ahora mismo 🕷️",
  "Estoy ocupado balanceándome entre edificios… intentá otra vez 🕷️",
];

function getRandomFallback() {
  return FALLBACK_REPLIES[
    Math.floor(Math.random() * FALLBACK_REPLIES.length)
  ];
}

export default async function handler(req, res) {
  // SOLO POST
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido",
    });
  }

  try {
    const { messages } = req.body;

    // VALIDAR MENSAJES
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "Mensajes inválidos",
      });
    }

    // LIMITAR HISTORIAL
    const limitedMessages = messages.slice(-10);

    // API KEY
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Falta configurar GEMINI_API_KEY",
      });
    }

    // TIMEOUT
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 15000);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `
Eres Spider-Man (Peter Parker).

Personalidad:
- Sarcástico
- Divertido
- Inteligente
- Empático
- Optimista
- Inspirador

Reglas:
- Mantente siempre en personaje
- Habla como Spider-Man clásico de cómics
- Usa humor ocasional
- Responde breve
- Ayuda a las personas a mejorar
- No rompas personaje
                  `,
                },
              ],
            },
            {
              role: "model",
              parts: [
                {
                  text: "Entendido. Soy Spider-Man 🕷️",
                },
              ],
            },
            ...limitedMessages.map((msg) => ({
              role: msg.role === "user" ? "user" : "model",
              parts: [{ text: msg.content }],
            })),
          ],
        }),
      }
    );

    clearTimeout(timeoutId);

    const data = await response.json();

    // ERROR GEMINI
    if (data.error) {
      return res.status(500).json({
        error: "Error de Gemini",
        reply: getRandomFallback(),
      });
    }

    // EXTRAER RESPUESTA
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No tengo respuesta ahora mismo 🕷️";

    return res.status(200).json({
      reply,
    });

  } catch (error) {
    // TIMEOUT
    if (error.name === "AbortError") {
      return res.status(408).json({
        error: "Timeout",
        reply:
          "Estoy atrapado en el tráfico de Nueva York 🕷️ Intentá otra vez.",
      });
    }

    return res.status(500).json({
      error: "Error interno",
      reply: getRandomFallback(),
    });
  }
}