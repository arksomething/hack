let conversationHistory = [];

export function addMessage(role, content) {
  conversationHistory.push({ role, content });
}

export function getHistory() {
  return conversationHistory;
}

export function clearHistory() {
  conversationHistory = [];
}