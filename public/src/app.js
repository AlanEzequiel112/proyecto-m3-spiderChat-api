import { addMessage, getMessages } from "./chat.js";

const view = document.getElementById("view");

// ---------- VISTAS ----------

function Home() {
  return `
    <h2>Home</h2>
    <p>Bienvenido al chat de Spider-Man 🕷️</p>
  `;
}

function About() {
  return `
    <h2>About</h2>
    <p>Proyecto SPA con Gemini AI</p>
  `;
}

function Chat() {
  return `
    <div class="chat-view">

      <div class="chat-header">
        <div>
          <h1>Spider-Man</h1>
          <span class="status">Online</span>
        </div>
      </div>

      <main class="chat-container" id="chat-container"></main>

      <footer class="chat-input">
        <input id="message-input" placeholder="Escribe un mensaje"/>
        <button id="send-btn">Enviar</button>
      </footer>

    </div>
  `;
}

// ---------- EVENTOS ----------

function setupChatEvents() {
  const input = document.getElementById("message-input");
  const button = document.getElementById("send-btn");

  if (!input || !button) return;

  button.addEventListener("click", handleSend);

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSend();
  });
}

// ---------- RENDER ----------

function renderMessages() {
  const chatContainer = document.getElementById("chat-container");
  if (!chatContainer) return;

  const messages = getMessages();

  if (messages.length === 0) {
    chatContainer.innerHTML =
      '<p class="empty-message">Empieza la conversación con Spider-Man.</p>';
    return;
  }

  const shouldScroll = isNearBottom(chatContainer);

  chatContainer.innerHTML = "";

  const spacer = document.createElement("div");
  spacer.style.flex = "1";
  chatContainer.appendChild(spacer);

  messages.forEach((msg) => {
    const div = document.createElement("div");
    div.classList.add("message", msg.role === "user" ? "user" : "bot");
    div.textContent = msg.content;
    chatContainer.appendChild(div);
  });

  if (shouldScroll) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
}

// ---------- CHAT LOGIC ----------

async function handleSend() {
  const input = document.getElementById("message-input");
  const text = input.value.trim();
  if (!text) return;

  // Usuario
  addMessage("user", text);
  input.value = "";
  renderMessages();

  // Mensaje temporal
  addMessage("bot", "...");
  renderMessages();

  const chatContainer = document.getElementById("chat-container");
  chatContainer.scrollTop = chatContainer.scrollHeight;

  try {
  const messages = getMessages();

  const response = await fetch("/api/functions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  const data = await response.json();

  messages[messages.length - 1].content = data.reply;

} catch (error) {
  const messages = getMessages();
  messages[messages.length - 1].content =
    "Error al conectar con Spider-Man 🕷️";
}

  renderMessages();
}

// ---------- ROUTER ----------

function router() {
  const path = window.location.pathname;

  if (path === "/" || path === "/home") {
    view.innerHTML = Home();
  } else if (path === "/chat") {
    view.innerHTML = Chat();
    renderMessages();
    setupChatEvents();
  } else if (path === "/about") {
    view.innerHTML = About();
  } else {
    view.innerHTML = "<h2>404</h2>";
  }
}

// ---------- NAV ----------

document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");
  if (link) {
    e.preventDefault();
    const href = link.getAttribute("href");

    history.pushState(null, null, href);
    router();
  }
} );

// ---------- INIT ----------

router();

function isNearBottom(container) {
  const threshold = 50; // margen en px
  return (
    container.scrollHeight - container.scrollTop - container.clientHeight <
    threshold
  );
}
