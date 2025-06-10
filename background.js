const updateAllTabTitles = async () => {
  const tabs = await chrome.tabs.query({});
  tabs.forEach((tab, index) => {
    const tabId = tab.id;
    if (!tab.url.startsWith('chrome://') && !tab.url.startsWith('chrome-extension://')) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['tabNumberUpdater.js'],
      }, () => {
        chrome.tabs.sendMessage(tabId, { number: index + 1 });
      });
    }
  });
};

chrome.tabs.onUpdated.addListener(updateAllTabTitles);
chrome.tabs.onMoved.addListener(updateAllTabTitles);
chrome.tabs.onActivated.addListener(updateAllTabTitles);
chrome.tabs.onRemoved.addListener(updateAllTabTitles);
chrome.tabs.onCreated.addListener(updateAllTabTitles);

chrome.runtime.onInstalled.addListener(() => {
  updateAllTabTitles();
});
