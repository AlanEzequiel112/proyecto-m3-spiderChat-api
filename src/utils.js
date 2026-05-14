export function formatMessage(message) {
  return message.trim();
}

export function isEmptyMessage(message) {
  return message.trim().length === 0;
}

export function getLastMessage(messages) {
  return messages[messages.length - 1];
}

export function addMessageToList(messages, role, content) {
  return [...messages, { role, content }];
}

export function removeTypingMessage(messages) {
  return messages.filter((msg) => msg.content !== "Escribiendo...");
}