const savedMessages =
  JSON.parse(localStorage.getItem("spider-chat")) || [];

const messages = savedMessages.filter(
  (msg) => msg.content !== "Escribiendo..."
);

function saveMessages() {
  const messagesToSave = messages.filter(
    (msg) => msg.content !== "Escribiendo..."
  );

  localStorage.setItem(
    "spider-chat",
    JSON.stringify(messagesToSave)
  );
}

export function addMessage(role, content) {
  messages.push({ role, content });
  saveMessages();
}

export function getMessages() {
  return messages;
}

export function updateLastMessage(content) {
  if (messages.length === 0) return;

  messages[messages.length - 1].content = content;
  saveMessages();
}

export function clearMessages() {
  messages.length = 0;

  localStorage.removeItem("spider-chat");
}