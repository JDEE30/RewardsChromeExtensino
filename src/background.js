import { PROJECT_NAME } from "./common/constant";

console.log("Hello Background");
const msgToContent = (port, msg) => {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		let tabPort = chrome.tabs.connect(tabs[0].id, {
			name: PROJECT_NAME,
		});
		tabPort.postMessage(msg);
		tabPort.onMessage.addListener(function (response) {
			port.postMessage(response);
		});
	});
};

chrome.runtime.onConnect.addListener(function (port) {
	console.log("Hello background");
	console.assert(port.name === PROJECT_NAME);
	port.onMessage.addListener(function (msg) {
		console.log(msg);
		if (msg.to === "content") {
			msgToContent(port, msg);
		}
	});
});
