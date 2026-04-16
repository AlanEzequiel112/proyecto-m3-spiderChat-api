const messages = [];

export function addMessage(role, content) {
  messages.push({ role, content });
}

export function getMessages() {
  return messages;
}