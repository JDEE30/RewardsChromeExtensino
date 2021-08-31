import { Button, Grid, Input } from "@material-ui/core";
import { useState } from "react";
import { CARD_LIST_PAGE } from "../../../common/constant";
import { setDataInStorage } from "../../../common/storageUtil";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

import {
	formatCreditCardNumber,
	formatCVC,
	formatExpirationDate,
	formatFormData,
} from "./CardDataUtil";
import { fns } from "payment";

const AddCard = (props) => {
	const { storageData, setStorageData, editCard, setEditCard, handleOpenInfoAlert, setPageNo } =
		props;
	const [inputData, setInputData] = useState(
		editCard
			? storageData.card_data[editCard]
			: {
					number: "",
					name: "",
					expiry: "",
					cvc: "",
					issuer: "",
					focused: "",
			  }
	);

	const handleInputDataSubmit = () => {
		if (Object.values(inputData).reduce((val, item) => val & (item.length > 0), true)) {
			console.log(inputData);
			if (
				(editCard === null && storageData.card_data[inputData.number]) ||
				(editCard && storageData.card_data[editCard].number !== inputData.number)
			) {
				console.log("Card already exist!!", inputData);
				handleOpenInfoAlert("error", "Card already exist!!");
			} else {
				let tempStorageData = {
					...storageData,
					card_data: {
						...storageData.card_data,
						[inputData.number]: { ...inputData },
					},
				};
				setStorageData(tempStorageData);
				setDataInStorage(tempStorageData).then(() => {
					console.log("storage data updated!!");
					if (editCard) {
						handleOpenInfoAlert("success", "Card edited successfully!!");
					} else {
						handleOpenInfoAlert("success", "Card added successfully!!");
					}
				});
				setPageNo(CARD_LIST_PAGE);
				setEditCard(null);
			}
		} else {
			console.log("Don't leave any field empty!! ", inputData);
			handleOpenInfoAlert("error", "Don't leave any field empty!!");
		}
	};

	const handleCallback = ({ issuer }, isValid) => {
		if (isValid) {
			setInputData({ ...inputData, issuer });
		}
	};

	const handleInputFocus = ({ target }) => {
		setInputData({
			...inputData,
			focused: target.name,
		});
	};

	const handleInputChange = ({ target }) => {
		if (target.name === "number") {
			target.value = formatCreditCardNumber(target.value);
		} else if (target.name === "expiry") {
			target.value = formatExpirationDate(target.value);
		} else if (target.name === "cvc") {
			target.value = formatCVC(target.value);
		}

		setInputData({ ...inputData, [target.name]: target.value });
	};

	return (
		<div className="add-card">
			<center>
				<h2>Add Card</h2>
			</center>
			<Card
				number={inputData.number}
				name={inputData.name}
				expiry={inputData.expiry}
				cvc={inputData.cvc}
				focused={inputData.focused}
				callback={handleCallback}
			/>
			<br />
			<br />
			<Input
				required
				disabled={!(editCard === null)}
				id="card-number"
				type="tel"
				name="number"
				value={inputData.number}
				pattern="[\d| ]{16,22}"
				placeholder="Card Number"
				fullWidth={true}
				onChange={handleInputChange}
				onFocus={handleInputFocus}
			/>
			<br />
			<br />
			<Input
				required
				id="card-holder-name"
				type="text"
				name="name"
				value={inputData.name}
				placeholder="Card Holder Name"
				fullWidth={true}
				onChange={handleInputChange}
				onFocus={handleInputFocus}
			/>
			<br />
			<br />
			<Grid container>
				<Grid xs={6} item>
					<Input
						required
						id="card-expiry-date"
						type="tel"
						name="expiry"
						value={inputData.expiry}
						placeholder="Valid Thru"
						pattern="\d\d/\d\d"
						onChange={handleInputChange}
						onFocus={handleInputFocus}
					/>
				</Grid>
				<Grid xs={1} item></Grid>
				<Grid xs={5} item>
					<Input
						required
						id="card-cvv"
						type="tel"
						name="cvc"
						value={inputData.cvv}
						placeholder="CVV"
						fullWidth={true}
						pattern="\d{3,4}"
						onChange={handleInputChange}
						onFocus={handleInputFocus}
					/>
				</Grid>
			</Grid>
			<input type="hidden" name="issuer" value={inputData.issuer} />
			<br />
			<br />
			<Button
				variant="contained"
				size="small"
				color="primary"
				onClick={() => handleInputDataSubmit()}
			>
				Save Card
			</Button>
		</div>
	);
};

export default AddCard;
