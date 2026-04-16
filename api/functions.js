console.log("VERSION NUEVA FUNCION");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
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

    if (data.error) {
  const fallbackReplies = [
    "Hmm… mis sensores arácnidos están fallando 🕷️. Intentá de nuevo en un rato.",
    "Algo raro pasa en la ciudad… pero sigo atento 🕷️",
    "No puedo responder ahora, pero sigo patrullando 🕷️",
  ];

  const randomReply =
    fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];

  return res.status(200).json({
    reply: randomReply
  });
}


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
  const fallbackReplies = [
    "Ey, soy Spider-Man 🕷️. Algo salió mal en la red… pero sigo atento.",
    "Hmm… hoy Nueva York está complicada 🕷️",
    "No puedo responder ahora, pero sigo patrullando 🕷️",
  ];

  const randomReply =
    fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];

  return res.status(200).json({
    reply: randomReply
  });
}}