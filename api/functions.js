const fetch = require("node-fetch");

module.exports = async (req, res) => {
  try {
    console.log("REQ METHOD:", req.method);

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    console.log("REQ BODY:", req.body);

    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body;

    const messages = body?.messages || [];

    console.log("MESSAGES:", messages);

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Falta API KEY" });
    }

    console.log("API KEY OK");

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
        apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: messages.map((msg) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
          })),
        }),
      }
    );

    console.log("FETCH STATUS:", response.status);

    const textResponse = await response.text();

    console.log("RAW RESPONSE:", textResponse);

    return res.status(200).json({ raw: textResponse });

  } catch (error) {
    console.error("ERROR TOTAL:", error);
    return res.status(500).json({ error: error.message });
  }
};