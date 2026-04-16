import { addMessage, getMessages } from "./chat.js";

const view = document.getElementById("view");

// ---------- VISTAS ----------

function Home() {
  return `
    <div class="home-view">
      <h2>🕷️ Spider Chat</h2>
      <p>Chatea con Spider-Man en tiempo real.</p>

      <a href="/chat" data-link class="start-btn">
        Empezar chat
      </a>
    </div>
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
    if (e.key === "Enter" && !isSending) handleSend();
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

let isSending = false;

async function handleSend() {
  if (isSending) return;
isSending = true;
  const input = document.getElementById("message-input");
  const button = document.getElementById("send-btn");

  const text = input.value.trim();
  if (!text) return;

  button.disabled = true;

  // Usuario
  addMessage("user", text);
  input.value = "";
  renderMessages();

  // Mensaje temporal
  addMessage("bot", "Escribiendo...");
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

    const msgs = getMessages();
    msgs[msgs.length - 1].content = data.reply;

  } catch (error) {
    const msgs = getMessages();
    msgs[msgs.length - 1].content =
      "Error al conectar con Spider-Man";
  } finally {
  button.disabled = false;
  isSending = false;
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
    setupChatEvents();
    renderMessages();
  } else if (path === "/about") {
    view.innerHTML = About();
  } else {
    view.innerHTML = "<h1>404 - Página no encontrada</h1>";
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
});

window.addEventListener("popstate", router);

// ---------- INIT ----------

router();

function isNearBottom(container) {
  const threshold = 50;
  return (
    container.scrollHeight - container.scrollTop - container.clientHeight <
    threshold
  );
}