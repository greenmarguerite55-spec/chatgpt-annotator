const STORAGE_PREFIX = "cgpt-annotator::";

const els = {
  pageStatus: document.getElementById("page-status"),
  annotatedChats: document.getElementById("annotated-chats"),
  noteCount: document.getElementById("note-count"),
  roundCount: document.getElementById("round-count"),
  exportHint: document.getElementById("export-hint"),
  exportButton: document.getElementById("export-button")
};

let currentChat = null;
let annotatedChatCount = 0;

bootstrap().catch((error) => {
  console.error(error);
  renderUnavailable();
});

async function bootstrap() {
  annotatedChatCount = await getAnnotatedChatCount();
  currentChat = await getCurrentChatData();
  render();
  els.exportButton.addEventListener("click", handleExport);
}

async function getAnnotatedChatCount() {
  const all = await chrome.storage.local.get(null);
  return Object.keys(all).filter((key) => key.startsWith(STORAGE_PREFIX) && Array.isArray(all[key]) && all[key].length > 0).length;
}

async function getCurrentChatData() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || typeof tab.id !== "number") {
    return null;
  }

  try {
    return await chrome.tabs.sendMessage(tab.id, { type: "cgpt-get-popup-data" });
  } catch (error) {
    return null;
  }
}

function render() {
  els.annotatedChats.textContent = String(annotatedChatCount);

  if (!currentChat || !currentChat.isConversationPage) {
    renderUnavailable();
    return;
  }

  els.pageStatus.textContent = "Current page is a ChatGPT conversation.";
  els.noteCount.textContent = String(currentChat.noteCount);
  els.roundCount.textContent = String(currentChat.roundCount);
  els.exportHint.textContent = currentChat.noteCount
    ? "Export every note in the active conversation as Markdown or JSON."
    : "This conversation has no saved notes yet, but export remains available.";
  els.exportButton.disabled = false;
}

function renderUnavailable() {
  els.pageStatus.textContent = "Open a ChatGPT conversation to see current chat stats and export notes.";
  els.noteCount.textContent = "0";
  els.roundCount.textContent = "0";
  els.exportHint.textContent = "The browser popup still shows your total annotated chats, but current-chat export only works on ChatGPT conversation pages.";
  els.exportButton.disabled = true;
}

function handleExport() {
  if (!currentChat || !currentChat.isConversationPage) {
    return;
  }

  const format = document.querySelector('input[name="format"]:checked')?.value || "md";
  const filenameBase = `chatgpt-annotations-${currentChat.chatSlug || "chatgpt"}`;

  if (format === "json") {
    const payload = {
      title: currentChat.title,
      url: currentChat.url,
      exportedAt: new Date().toISOString(),
      stats: {
        annotatedChats: annotatedChatCount,
        notesInThisChat: currentChat.noteCount,
        roundsInThisChat: currentChat.roundCount
      },
      annotations: currentChat.annotations || []
    };
    downloadFile(`${filenameBase}.json`, JSON.stringify(payload, null, 2), "application/json;charset=utf-8");
    return;
  }

  downloadFile(`${filenameBase}.md`, buildMarkdownDocument(currentChat), "text/markdown;charset=utf-8");
}

function buildMarkdownDocument(chat) {
  const lines = [
    `# ${chat.title || "ChatGPT Conversation"}`,
    "",
    `URL: ${chat.url || ""}`,
    `Exported: ${new Date().toISOString()}`,
    ""
  ];

  if (!chat.annotations || !chat.annotations.length) {
    lines.push("No annotations found.");
    return lines.join("\n");
  }

  chat.annotations.forEach((annotation, index) => {
    lines.push(`## Annotation ${index + 1}`);
    lines.push("");
    lines.push("### Highlight");
    lines.push("");
    lines.push(annotation.quote || "");
    lines.push("");
    lines.push("### Note");
    lines.push("");
    lines.push(annotation.note || "");
    lines.push("");
  });

  return lines.join("\n");
}

function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}
