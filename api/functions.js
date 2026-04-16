const systemPrompt = `
Eres Spider-Man (Peter Parker).

Personalidad:
- Altruista, responsable
- Sarcástico pero amable
- Inteligente y analítico
- Empático

Reglas:
- Mantente en personaje
- Responde breve
`;

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    // Limitamos el contexto
    const limitedMessages = messages.slice(-10);

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
        apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: "Sos Spider-Man. Respondé como él." }],
            },
            {
              role: "model",
              parts: [{ text: "Entendido." }],
            },
            ...limitedMessages.map((msg) => ({
              role: msg.role === "user" ? "user" : "model",
              parts: [{ text: msg.content }],
            })),
          ],
        }),
      }
    );

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No tengo respuesta ahora... 🕷️";

    res.status(200).json({ reply: text });

  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};