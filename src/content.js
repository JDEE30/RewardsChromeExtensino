import { getDataFromStorage } from "./common/storageUtil";

function fillCardData() {
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
		}, 1000);
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

				autoCompleteData(variableDomId, selectedCard);
			}
		});
	} else {
		getDataFromStorage().then((storageData) => {
			let cardData = storageData.card_data;
			if (Object.entries(cardData).length > 0) {
				let selectedCard = cardData[storageData.selected_card];

				setTimeout(() => {
					let numberInput = [...document.querySelectorAll("input")].filter(
						(input) =>
							[...input.attributes].filter((item) =>
								["card", "number", "num", "cardnumber", "ccnumber", "ccnum"].reduce(
									(value, it) =>
										value |
										(item.value
											.toLowerCase()
											.replace(/([^a-z]+)/g, "")
											.indexOf(it) >=
											0),
									false
								)
							).length > 0
					)[0];

					if (numberInput) numberInput.value = selectedCard.number;

					let cvcInput = [...document.querySelectorAll("input")].filter(
						(input) =>
							[...input.attributes].filter((item) =>
								["cvc", "csc", "cccvc", "cccsc", "cardcvc", "cardcsc"].reduce(
									(value, it) =>
										value |
										(item.value
											.toLowerCase()
											.replace(/([^a-z]+)/g, "")
											.indexOf(it) >=
											0),
									false
								)
							).length > 0
					)[0];

					if (cvcInput) cvcInput.value = selectedCard.cvc;

					let nameInput = [...document.querySelectorAll("input")].filter(
						(input) =>
							[...input.attributes].filter((item) =>
								["name", "ccname", "cardname"].reduce(
									(value, it) =>
										value |
										(item.value
											.toLowerCase()
											.replace(/([^a-z]+)/g, "")
											.indexOf(it) >=
											0),
									false
								)
							).length > 0
					)[0];
					if (nameInput) nameInput.value = selectedCard.name;

					let expiryInput = [...document.querySelectorAll("input")].filter(
						(input) =>
							[...input.attributes].filter((item) =>
								[
									"expiry",
									"exp",
									"ccexpiry",
									"cardexpiry",
									"ccexp",
									"cardexp",
									"expdate",
									"ccexpdate",
									"cardexpdate",
								].reduce(
									(value, it) =>
										value |
										(item.value
											.toLowerCase()
											.replace(/([^a-z]+)/g, "")
											.indexOf(it) >=
											0),
									false
								)
							).length > 0
					)[0];
					if (expiryInput) expiryInput.value = selectedCard.expiry;

					let monthInput = [...document.querySelectorAll("input")].filter(
						(input) =>
							[...input.attributes].filter((item) =>
								[
									"month",
									"ccmonth",
									"expirymonth",
									"expmonth",
									"ccexpirymonth",
									"cardexpirymonth",
									"ccexpmonth",
									"cardexpmonth",
									"expdatemonth",
								].reduce(
									(value, it) =>
										value |
										(item.value
											.toLowerCase()
											.replace(/([^a-z]+)/g, "")
											.indexOf(it) >=
											0),
									false
								)
							).length > 0
					)[0];
					if (monthInput) monthInput.value = selectedCard.expiry.split("/")[0];

					let yearInput = [...document.querySelectorAll("input")].filter(
						(input) =>
							[...input.attributes].filter((item) =>
								[
									"year",
									"ccyear",
									"expiryyear",
									"expyear",
									"ccexpiryyear",
									"cardexpiryyear",
									"ccexpyear",
									"cardexpyear",
									"expdateyear",
								].reduce(
									(value, it) =>
										value |
										(item.value
											.toLowerCase()
											.replace(/([^a-z]+)/g, "")
											.indexOf(it) >=
											0),
									false
								)
							).length > 0
					)[0];
					if (yearInput) yearInput.value = "20" + selectedCard.expiry.split("/")[1];
				}, 1000);
			}
		});
	}
}

chrome.runtime.onConnect.addListener(function (port) {
	console.log("content page");
	port.onMessage.addListener(function (msg) {
		console.log(msg);
		if (msg.query === "FILL_CARD_DATA") {
			fillCardData();
		}
	});
});
