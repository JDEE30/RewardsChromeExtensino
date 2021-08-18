class Messenger {
  private static instance: Messenger;

  static getInstance() {
    if (!this.instance) {
      this.instance = new Messenger();
    }

    return this.instance;
  }

  sendToTab(tabId: number, type: string, payload?: any) {
    chrome.tabs.sendMessage(tabId, {type, payload});
  }

  addListener(callback: (request, sender, sendResponse) => void) {
    chrome.runtime.onMessage.addListener(callback);
  }

  sendToBackground(type: string, payload?: any) {
    chrome.runtime.sendMessage({type, payload});
  }
}


export const messenger = Messenger.getInstance();
