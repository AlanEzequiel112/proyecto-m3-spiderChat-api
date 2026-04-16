export function formatMessage(text) {
  return text.trim();
}

export function isEmptyMessage(text) {
  return text.trim().length === 0;
}

export function getLastMessage(messages) {
  return messages[messages.length - 1];
}

export function addMessage(messages, role, content) {
  return [...messages, { role, content }];
}