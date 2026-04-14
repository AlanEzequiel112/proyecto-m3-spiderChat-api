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
function handleSend() {
  const text = input.value.trim();

  if (!text) return;

  // Usuario
  addMessage("user", text);

  // Respuesta fake (por ahora)
  addMessage("bot", "Hey, tranquilo... estoy ocupado salvando la ciudad 🕷️");

  input.value = "";

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