import { getDataFromStorage } from "./common/storageUtil";

(function () {
	const URL = document.location.href;

	const autoCompleteData = (variableDomId, selectedCard) => {
		setTimeout(() => {
			let cardNumberInput = document.querySelector(`#${variableDomId}-14`);
			let cardHolderNameInput = document.querySelector(`#${variableDomId}-16`);
			let cardExpiryMonthInput = document.querySelector(`#${variableDomId}-17`);
			let cardExpiryYearInput = document.querySelector(`#${variableDomId}-19`);

			let cardExpiryMonthHtml = document.querySelector(`#${variableDomId}-20`);
			let cardExpiryYearHtml = document.querySelector(`#${variableDomId}-21`);

			console.log("cardNumberInput", cardNumberInput);
			console.log("cardHolderNameInput", cardHolderNameInput);
			console.log("cardExpiryMonthInput", cardExpiryMonthInput);
			console.log("cardExpiryYearInput", cardExpiryYearInput);
			console.log("cardExpiryMonthHtml", cardExpiryMonthHtml);
			console.log("cardExpiryYearHtml", cardExpiryYearHtml);

			cardNumberInput.value = selectedCard.number;
			cardHolderNameInput.value = selectedCard.name;

			const month = selectedCard.expiry.split("/")[0];
			const year = "20" + selectedCard.expiry.split("/")[1];

			cardExpiryMonthInput.value = parseInt(month);
			cardExpiryYearInput.value = parseInt(year);

			cardExpiryMonthHtml.innerHTML = cardExpiryMonthHtml.innerHTML.replace(
				cardExpiryMonthHtml.textContent,
				month
			);
			cardExpiryYearHtml.innerHTML = cardExpiryYearHtml.innerHTML.replace(
				cardExpiryYearHtml.textContent,
				year
			);

			console.log("Data added!!");
		}, 2000);
	};

	if (URL.indexOf("https://apx-security.amazon.com/cpe/pm/register") >= 0) {
		console.log("frame found!! ", document);
		getDataFromStorage().then((storageData) => {
			let cardData = storageData.card_data;
			if (Object.entries(cardData).length > 0) {
				let selectedCard = cardData[storageData.selected_card];
				let variableDomId = document.querySelector("input[name='addCreditCardNumber']").id;
				variableDomId = variableDomId.substring(0, variableDomId.length - 3);

				console.log("generic dom id: ", variableDomId);

				window.onload = () => autoCompleteData(variableDomId, selectedCard);
			}
		});
	}
})();
