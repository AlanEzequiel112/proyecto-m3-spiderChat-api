import { addMessage, getMessages } from "./chat.js";

const input = document.getElementById("message-input");
const button = document.getElementById("send-btn");
const chatContainer = document.getElementById("chat-container");

// Render mensajes
function renderMessages() {
  chatContainer.innerHTML = "";

  const messages = getMessages();

  if (messages.length === 0) {
    chatContainer.innerHTML =
      '<p class="empty-message">Empieza la conversación con Spider-Man.</p>';
    return;
  }

  messages.forEach((msg) => {
    const div = document.createElement("div");
    div.classList.add("message");

    if (msg.role === "user") {
      div.classList.add("user");
    } else {
      div.classList.add("bot");
    }

    div.textContent = msg.content;
    chatContainer.appendChild(div);
  });

  // Scroll automático
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Evento enviar
async function handleSend() {
  const text = input.value.trim();

  if (!text) return;

  // Usuario
  addMessage("user", text);

  input.value = "";

  renderMessages();

  // Loading (mensaje temporal)
  addMessage("bot", "...");
  renderMessages();

  try {
    // Simulación async (después será fetch)
    await new Promise((res) => setTimeout(res, 1000));

    // Reemplazar último mensaje (loading)
    const messages = getMessages();
    messages[messages.length - 1].content =
      "Hmm... interesante. Pero no te distraigas, hay crimen que detener 🕷️";

  } catch (error) {
    const messages = getMessages();
    messages[messages.length - 1].content =
      "Ups... algo salió mal. Culpa de algún villano seguro.";
  }

  renderMessages();
}

button.addEventListener("click", handleSend);

// Enter para enviar
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSend();
  }
});

// Render inicial
renderMessages();