chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    const queryParameters = tab.url.split("?")[1];

    const urlParameters = new URLSearchParams(queryParameters);

    console.log("tab is", tab);
    console.log("urlParameters is", urlParameters.get("v"));

    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v"),
    });
  }
});

// function runEvery5Seconds() {
//   console.log("globalV is");
//   console.log(globalV);
// }

// setInterval(runEvery5Seconds, 5000);
