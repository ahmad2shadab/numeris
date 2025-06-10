chrome.runtime.onMessage.addListener((request) => {
  const originalTitle = document.title.replace(/^\[\d+\]\s*/, '');
  document.title = `[${request.number}] ${originalTitle}`;
});
