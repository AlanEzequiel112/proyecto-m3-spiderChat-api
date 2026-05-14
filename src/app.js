import {addMessage, getMessages, updateLastMessage, clearMessages,} from "./chat.js";

const view = document.getElementById("view");

// ---------- VISTAS ----------

function Home() {
  return `
    <section class="home-view">

      <div class="hero-card">

        <img
          src="/src/spider-logo-2.png"
          alt="Spider-Man logo"
          class="hero-logo"
        />

        <h1>Spider Chat</h1>

        <p class="hero-text">
          Habla con Spider-Man como si estuvieras en Nueva York.
          Humor, consejos y respuestas rápidas del héroe más amistoso.
        </p>

        <a href="/chat" data-link class="start-btn">
          Empezar chat
        </a>

      </div>

    </section>
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

      <div id="chat-alert" class="chat-alert hidden"></div>

      <footer class="chat-input">
  <input 
    id="message-input" 
    placeholder="Habla con Spider-Man..."
    maxlength="300"
  />

  <button id="send-btn">
    Enviar
  </button>

  <button id="clear-btn">
    Limpiar
  </button>
</footer>

    </div>
  `;
}

function About() {
  return `
    <section class="about-view">

      <div class="about-card">

        <div class="character-card">
          <img
            src="/src/spider-logo-2.png"
            alt="Spider-Man logo"
            class="character-logo"
          />

          <div>
            <span class="character-label">
              Meet the character
            </span>

            <h2>Spider-Man</h2>

            <p>
              Un héroe amistoso de Nueva York, sarcástico,
              optimista y siempre listo para ayudarte.
            </p>
          </div>
        </div>

        <h3>Sobre Spider Chat</h3>

        <p>
          Spider Chat es una SPA desarrollada con JavaScript Vanilla,
          History API y Gemini AI.
        </p>

        <p>
          El proyecto simula conversaciones con Spider-Man manteniendo
          su personalidad sarcástica, optimista y amigable.
        </p>

        <p>
          Tecnologías utilizadas:
        </p>

        <ul>
          <li>HTML5</li>
          <li>CSS3</li>
          <li>JavaScript Vanilla</li>
          <li>Vercel Functions</li>
          <li>Gemini AI</li>
          <li>Vitest</li>
        </ul>

      </div>

    </section>
  `;
}

// ---------- EVENTOS ----------

function setupChatEvents() {
  const input = document.getElementById("message-input");
  const button = document.getElementById("send-btn");
  const clearBtn = document.getElementById("clear-btn");

  if (!input || !button || !clearBtn) return;
  input.focus();

  button.addEventListener("click", handleSend);

  clearBtn.addEventListener("click", () => {
    clearMessages();
    renderMessages();
  });

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

  div.classList.add(
    "message",
    msg.role === "user" ? "user" : "bot"
  );

  if (msg.role === "bot") {
    div.innerHTML = `
      <div class="bot-message-content">
        <img
          src="/src/spider-logo-2.png"
          alt="Spider Logo"
          class="bot-logo"
        />

        <span>${msg.content}</span>
      </div>
    `;
  } else {
    div.textContent = msg.content;
  }

  chatContainer.appendChild(div);
});

  if (shouldScroll) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
}

function showChatAlert(message) {
  const alert = document.getElementById("chat-alert");
  if (!alert) return;

  alert.textContent = message;
  alert.classList.remove("hidden");
}

function hideChatAlert() {
  const alert = document.getElementById("chat-alert");
  if (!alert) return;

  alert.textContent = "";
  alert.classList.add("hidden");
}

// ---------- CHAT LOGIC ----------
const DEBUG_FORCE_ERROR = false;
// pueden probar el mensaje de error, al modificarlo por true.
let isSending = false;

async function handleSend() {
  if (isSending) return;
    hideChatAlert();
isSending = true;
  const input = document.getElementById("message-input");
  const button = document.getElementById("send-btn");

  const text = input.value.trim();
  if (!text) {
  input.focus();
  isSending = false;
  return;
}

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
  const messages = getMessages().filter(
    (msg) => msg.content !== "Escribiendo..."
  );

  if (DEBUG_FORCE_ERROR) {
  throw new Error("Error forzado para probar aviso visual");
}

  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 15000);

  const response = await fetch("/api/functions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
    signal: controller.signal,
  });

clearTimeout(timeoutId);

    const data = await response.json();

updateLastMessage(data.reply);

  } catch (error) {
    const msgs = getMessages();
   msgs[msgs.length - 1].content =
  "No pude conectar con Spider-Man en este momento.";

showChatAlert(
  "No se pudo contactar con Spider-Man en este momento. Intentá nuevamente en unos segundos."
);
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