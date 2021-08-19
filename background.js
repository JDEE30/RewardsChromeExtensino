chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        name: "John",
        age: 20
    });
});

chrome.storage.local.get(['name', 'age'], data => {

});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.status === 'complete' && /^http/.test(tab.url)) {
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ["./foreground.js"]
        })
            .then(() => {
                console.log("Injected foreground script")
            })
            .catch(err => console.log(err));
    }
});