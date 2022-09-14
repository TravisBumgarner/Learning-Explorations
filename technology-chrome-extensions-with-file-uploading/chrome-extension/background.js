// To accesss console.logs here, navigate to extension and click Inspect views -> service worker
// Or right click icon in Chrome menu and inspect popup

chrome.tabs.onUpdated.addListener((tabId, changeinfo, tab) => {
  chrome.tabs.sendMessage(tabId, {
    type: "PING",
    data: "PONG!"
  });
  // }
});