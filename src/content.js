import { getDataFromStorage } from "./common/storageUtil";

(function () {
	const URL = document.location.href;

	const autoCompleteData = (variableDomId, selectedCard) => {
		document.querySelector(`#${variableDomId}-14`).value = selectedCard.card_number;
		document.querySelector(`#${variableDomId}-16`).value = selectedCard.card_holder_name;
		document.querySelector(`#${variableDomId}-17`).value = selectedCard.card_expiry_date_month;
		document.querySelector(`#${variableDomId}-19`).value = selectedCard.card_expiry_date_year;
		document.querySelector(`#${variableDomId}-20`).innerHTML = document
			.querySelector(`#${variableDomId}-20`)
			.innerHTML.replace(
				document.querySelector(`#${variableDomId}-20`).textContent,
				selectedCard.card_expiry_date_month
			);
		document.querySelector(`#${variableDomId}-21`).innerHTML = document
			.querySelector(`#${variableDomId}-21`)
			.innerHTML.replace(
				document.querySelector(`#${variableDomId}-21`).textContent,
				selectedCard.card_expiry_date_year
			);

		console.log("Data added!!");
	};

	if (URL.indexOf("https://apx-security.amazon.com/cpe/pm/register") >= 0) {
		console.log("frame found!! ", document);
		getDataFromStorage().then((storageData) => {
			let cardData = Object.values(storageData.card_data);
			if (cardData.length > 0) {
				let selectedCard = cardData[0];
				let variableDomId = document.querySelector("input[name='addCreditCardNumber']").id;
				variableDomId = variableDomId.substring(0, variableDomId.length - 3);

				console.log(variableDomId);

				window.onload = () => autoCompleteData(variableDomId, selectedCard);
			}
		});
	}
})();
