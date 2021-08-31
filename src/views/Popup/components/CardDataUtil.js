import Payment from "payment";

function clearNumber(value = "") {
	return value.replace(/\D+/g, "");
}

export function formatCreditCardNumber(value) {
	if (!value) {
		return value;
	}

	const issuer = Payment.fns.cardType(value);
	const clearValue = clearNumber(value);
	let nextValue;

	switch (issuer) {
		case "amex":
			nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(
				10,
				15
			)}`;
			break;
		case "dinersclub":
			nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(
				10,
				14
			)}`;
			break;
		default:
			nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(
				8,
				12
			)} ${clearValue.slice(12, 19)}`;
			break;
	}

	return nextValue.trim();
}

export function formatCVC(value, prevValue, allValues = {}) {
	const clearValue = clearNumber(value);
	let maxLength = 4;

	if (allValues.number) {
		const issuer = Payment.fns.cardType(allValues.number);
		maxLength = issuer === "amex" ? 4 : 3;
	}

	return clearValue.slice(0, maxLength);
}

export function formatExpirationDate(value) {
	const clearValue = clearNumber(value);

	if (clearValue.length >= 3) {
		return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
	}

	return clearValue;
}

export function formatFormData(data) {
	return Object.keys(data).map((d) => `${d}: ${data[d]}`);
}

export function verifyFormData(editCard, storageData, inputData, handleOpenInfoAlert) {
	if (
		Object.values(inputData).reduce(
			(val, item) =>
				val &
				(["number", "name", "cvc", "expiry", "issuer"].indexOf(item) < 0 ||
					item.length > 0),
			true
		)
	) {
		if (
			Payment.fns.validateCardNumber(inputData.number) &&
			Payment.fns.validateCardCVC(inputData.cvc) &&
			Payment.fns.validateCardExpiry(inputData.expiry)
		) {
			if (editCard && storageData.card_data[inputData.number]) {
				console.log("Card already exist!!", inputData);
				handleOpenInfoAlert("error", "Card already exist!!");
			} else if (
				inputData.rewards.filter(
					(reward) =>
						(reward.category.length === 0 && reward.point.length >= 0) ||
						(reward.category.length >= 0 && reward.point.length === 0)
				).length > 0
			) {
				console.log("Invalid reward data!!", inputData);
				handleOpenInfoAlert("error", "Invalid reward data!!");
			} else {
				return true;
			}
		} else {
			console.log("Invalid card data!!", inputData);
			handleOpenInfoAlert("error", "Invalid card data!!");
		}
	} else {
		console.log("Don't leave any field empty!! ", inputData);
		handleOpenInfoAlert("error", "Don't leave any field empty!!");
	}
	return false;
}
