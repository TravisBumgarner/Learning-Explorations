// To accesss console.logs here, navigate to extension and click Inspect views -> service worker
// Or right click icon in Chrome menu and inspect popup

chrome.tabs.onUpdated.addListener((tabId, changeinfo, tab) => {
    if (tab.url && tab.url.includes("youtube.com/watch")) {
      const queryParameters = tab.url.split("?")[1];
      const urlParameters = new URLSearchParams(queryParameters);
      chrome.tabs.sendMessage(tabId, {
        // Can pass any key/values you want here.
        type: "NEW",
        videoId: urlParameters.get("v"),
      });
    }
  });