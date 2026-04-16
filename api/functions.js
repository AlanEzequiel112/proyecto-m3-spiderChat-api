export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    const response = await fetch(
  `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
  {
    role: "user",
    parts: [{
      text: `Eres Spider-Man (Peter Parker).

Personalidad:
- Altruista, responsable
- Sarcástico pero amable
- Inteligente y analítico
- Empático

Reglas:
- Mantente en personaje
- Responde breve
`
    }],
  },
  {
    role: "model",
    parts: [{ text: "Entendido. Actuaré como Spider-Man." }],
  },
  ...messages.map((msg) => ({
    role: msg.role === "user" ? "user" : "model",
    parts: [{ text: msg.content }],
  })),
]
        }),
      }
    );

    const data = await response.json();


console.log("GEMINI RESPONSE:", JSON.stringify(data));

let reply = "No tengo respuesta ahora 🕷️";

if (
  data &&
  data.candidates &&
  data.candidates.length > 0 &&
  data.candidates[0].content &&
  data.candidates[0].content.parts &&
  data.candidates[0].content.parts.length > 0
) {
  reply = data.candidates[0].content.parts[0].text;
}

    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({ error: "Error en servidor" });
  }
}
