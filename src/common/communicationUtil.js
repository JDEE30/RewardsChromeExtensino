import { PROJECT_NAME } from "./constant";

export const sentMessageToBackground = (payload, responseCB) => {
	let port = chrome.runtime.connect({ name: PROJECT_NAME });
	port.postMessage(payload);
	port.onMessage.addListener(responseCB);
};
