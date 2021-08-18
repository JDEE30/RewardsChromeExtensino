import { messenger } from "@services/core/messanger";

chrome.runtime.onInstalled.addListener(
  (details) => {

    switch (details.reason) {
      case "update": {
        chrome.runtime.openOptionsPage();
        break;
      }
      case "install": {
        break;
      }
    }
  }
);

chrome.browserAction.onClicked.addListener(tab =>
  console.log(tab)
);

chrome.runtime.onUpdateAvailable.addListener(() => {
  chrome.runtime.reload();
});

/**
 * Listen to messages from content script.
 */
messenger.addListener(request => {
  const payload = request.payload;

  switch (request.type) {

  }
});
