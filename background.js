const MENU_ID = "cgpt-add-annotation";
const CHATGPT_PATTERNS = [
  "https://chatgpt.com/*",
  "https://chat.openai.com/*"
];

function createMenu() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: MENU_ID,
      title: "Add annotation",
      contexts: ["selection"],
      documentUrlPatterns: CHATGPT_PATTERNS
    });
  });
}

chrome.runtime.onInstalled.addListener(() => {
  createMenu();
});

chrome.runtime.onStartup.addListener(() => {
  createMenu();
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== MENU_ID || !tab || typeof tab.id !== "number") {
    return;
  }

  chrome.tabs.sendMessage(tab.id, {
    type: "cgpt-open-annotator-from-context-menu"
  }, () => void chrome.runtime.lastError);
});
