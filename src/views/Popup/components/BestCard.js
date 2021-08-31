import React, { useEffect } from "react";
import Cards from "react-credit-cards";

const BestCard = (props) => {
	const { storageData, setStorageData } = props;

	let bestCard = storageData.selected_card;

	const findBestCard = () => {
		console.log("find best card!!");
		const selectedCategory = storageData.selected_category;
		const cardData = storageData.card_data;
		let bestCardIndex = Object.values(cardData).reduce((maxIndex, card, index, cardArray) => {
			//console.log(cardArray[maxIndex], maxIndex);
			let maxIndexMax = Math.max.apply(
				Math,
				cardArray[maxIndex].rewards
					.filter((o) => o.category === selectedCategory)
					.map((o) => o.point)
			);

			//console.log(card);
			let indexMax = Math.max.apply(
				Math,
				card.rewards.filter((o) => o.category === selectedCategory).map((o) => o.point)
			);

			return maxIndexMax >= indexMax ? maxIndex : index;
		}, 0);

		//console.log(bestCardIndex);

		let bestCardMaxPoint = Math.max.apply(
			Math,
			Object.values(cardData)
				[bestCardIndex].rewards.filter((o) => o.category === selectedCategory)
				.map((o) => o.point)
		);

		if (bestCardMaxPoint > 0) {
			setStorageData({
				...storageData,
				selected_card: Object.values(cardData)[bestCardIndex].number,
			});
		} else {
			setStorageData({
				...storageData,
				selected_card: "",
			});
		}
	};

	useEffect(() => {
		console.log("find best card!!");
		findBestCard();
	}, []);

	console.log(bestCard);

	return (
		<React.Fragment>
			{bestCard && (
				<center>
					<h2>Best card for {storageData.selected_category} category is:</h2>
					<br />
					<Cards
						cvc={storageData.card_data[bestCard].cvc}
						expiry={storageData.card_data[bestCard].expiry}
						focused={storageData.card_data[bestCard].focus}
						name={storageData.card_data[bestCard].name}
						number={storageData.card_data[bestCard].number}
					/>
				</center>
			)}
			{!bestCard && (
				<center>
					<h2>Best card for {storageData.selected_category} category is:</h2>
					<br />
					<h3>No best card found!!</h3>
				</center>
			)}
		</React.Fragment>
	);
};

export default BestCard;
