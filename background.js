chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.storage({
        name: "John",
        age: 20
    });
});

chrome.storage.local.get(['name', 'age'], data => {

});