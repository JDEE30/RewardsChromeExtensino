chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        name: "John",
        age: 20
    });
});

chrome.storage.local.get(['name', 'age'], data => {

});

console.log("background.js working");