import React, { useEffect, useState } from "react";
import Cards from "react-credit-cards";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { sentMessageToBackground } from "../../../common/communicationUtil";
import { IconButton, Tooltip } from "@material-ui/core";

const BestCard = (props) => {
	const { storageData, setStorageData } = props;
	const [cardFocus, setCardFocus] = useState("number");

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
				[bestCardIndex]?.rewards.filter((o) => o.category === selectedCategory)
				.map((o) => o.point)
		);

		if (bestCardMaxPoint > 0) {
			setStorageData({
				...storageData,
				selected_card: Object.values(cardData)[bestCardIndex]?.number,
			});
		} else {
			setStorageData({
				...storageData,
				selected_card: Object.keys(storageData.card_data)[0],
			});
		}

		sentMessageToBackground({ to: "content", query: "FILL_CARD_DATA" }, (response) => {
			console.log(response);
		});
	};

	useEffect(() => {
		console.log("find best card!!");
		findBestCard();
	}, []);

	console.log(bestCard);

	return (
		<React.Fragment>
			{bestCard && storageData.card_data[bestCard] && (
				<center>
					<h2>Best card for {storageData.selected_category} category is:</h2>
					<br />
					<Cards
						cvc={storageData.card_data[bestCard].cvc}
						expiry={storageData.card_data[bestCard].expiry}
						focused={cardFocus}
						name={storageData.card_data[bestCard].name}
						number={storageData.card_data[bestCard].number}
					/>
					<br />
					<br />
					<center>
						<Tooltip title="Rotate card" placement="left">
							<IconButton
								size="small"
								color="primary"
								onClick={() =>
									setCardFocus(cardFocus === "number" ? "cvc" : "number")
								}
							>
								<AutorenewIcon />
							</IconButton>
						</Tooltip>
					</center>
				</center>
			)}
			{(!bestCard || !storageData.card_data[bestCard]) && (
				<center>
					<h2>Best card for {storageData.selected_category} category is:</h2>
					<br />
					{Object.keys(storageData.card_data)[0] && (
						<React.Fragment>
							<Cards
								cvc={
									storageData.card_data[Object.keys(storageData.card_data)[0]].cvc
								}
								expiry={
									storageData.card_data[Object.keys(storageData.card_data)[0]]
										.expiry
								}
								focused={
									storageData.card_data[Object.keys(storageData.card_data)[0]]
										.focus
								}
								name={
									storageData.card_data[Object.keys(storageData.card_data)[0]]
										.name
								}
								number={
									storageData.card_data[Object.keys(storageData.card_data)[0]]
										.number
								}
							/>
							<br />
							<br />
							<center>
								<Tooltip title="Rotate card" placement="left">
									<IconButton
										size="small"
										color="primary"
										onClick={() =>
											setCardFocus(cardFocus === "number" ? "cvc" : "number")
										}
									>
										<AutorenewIcon />
									</IconButton>
								</Tooltip>
							</center>
						</React.Fragment>
					)}
					{!Object.keys(storageData.card_data)[0] && <h3>No best card found!!</h3>}
				</center>
			)}
		</React.Fragment>
	);
};

export default BestCard;
