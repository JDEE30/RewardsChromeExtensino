import { Button, Grid, Input } from "@material-ui/core";
import { useState } from "react";
import { CARD_LIST_PAGE } from "../../../common/constant";
import { setDataInStorage } from "../../../common/storageUtil";

const AddCard = (props) => {
	const { storageData, setStorageData, editCard, setEditCard, handleOpenInfoAlert, setPageNo } =
		props;
	const [inputData, setInputData] = useState(
		editCard
			? storageData.card_data[editCard]
			: {
					card_number: "",
					card_cvv: "",
					card_holder_name: "",
					card_expiry_date_month: "",
					card_expiry_date_year: "",
					card_vendor: "Not specified",
			  }
	);

	const handleInputDataSubmit = () => {
		if (Object.values(inputData).reduce((val, item) => val & (item.length > 0), true)) {
			console.log(inputData);
			if (
				(editCard === null && storageData.card_data[inputData.card_number]) ||
				(editCard && storageData.card_data[editCard].card_number !== inputData.card_number)
			) {
				console.log("Card already exist!!", inputData);
				handleOpenInfoAlert("error", "Card already exist!!");
			} else {
				let tempStorageData = {
					...storageData,
					card_data: {
						...storageData.card_data,
						[inputData.card_number]: { ...inputData },
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

	const handleCardVendorInput = (number) => {
		var re = {
			electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
			maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
			dankort: /^(5019)\d+$/,
			interpayment: /^(636)\d+$/,
			unionpay: /^(62|88)\d+$/,
			visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
			mastercard: /^5[1-5][0-9]{14}$/,
			amex: /^3[47][0-9]{13}$/,
			diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
			discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
			jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
		};

		for (var key in re) {
			if (re[key].test(number)) {
				return key;
			}
		}

		return "Not specified";
	};

	const handleCardNumberInput = (e) => {
		const onlyNums = e.target.value.replace(/[^0-9]/g, "");
		const cardVendor = handleCardVendorInput(onlyNums);
		if (onlyNums.length <= 19) {
			console.log(onlyNums);
			setInputData({
				...inputData,
				card_number: onlyNums,
				card_vendor: cardVendor,
			});
		}
	};

	const handleCardCvvInput = (e) => {
		const onlyNums = e.target.value.replace(/[^0-9]/g, "");
		if (onlyNums.length <= 3) {
			setInputData({
				...inputData,
				card_cvv: onlyNums,
			});
		}
	};

	const handleCardExpiryDateYearInput = (e) => {
		const yearInput = e.target.value.replace(/[^0-9]/g, "");

		if (
			yearInput.length < 4 ||
			(yearInput.length === 4 &&
				((inputData.card_expiry_date_month === "" &&
					parseInt(yearInput) >= new Date().getFullYear()) ||
					(parseInt(inputData.card_expiry_date_month) >= new Date().getMonth() &&
						parseInt(yearInput) >= new Date().getFullYear()) ||
					(parseInt(inputData.card_expiry_date_month) < new Date().getMonth() &&
						parseInt(yearInput) > new Date().getFullYear())))
		) {
			setInputData({
				...inputData,
				card_expiry_date_year: yearInput,
			});
		}
	};

	const handleCardExpiryDateMonthInput = (e) => {
		const monthInput = e.target.value.replace(/[^0-9]/g, "");

		if (monthInput === "" || parseInt(monthInput) <= 12) {
			setInputData({
				...inputData,
				card_expiry_date_month: monthInput,
			});
		}
	};

	return (
		<fieldset style={{ borderRadius: "10px", borderColor: "#3f51b5" }}>
			<legend style={{ fontSize: 16 }}>
				<b>Add Card</b>
			</legend>
			<div class="add-card">
				<br />
				<b style={{ color: "gray", fontSize: 15 }}>Card vendor: </b>{" "}
				<b style={{ fontSize: 15 }}>{inputData.card_vendor}</b>
				<br />
				<br />
				<Input
					id="card-number"
					required
					disabled={!(editCard === null)}
					color={
						inputData.card_number.length === 0
							? "default"
							: inputData.card_number.length >= 7
							? "primary"
							: "secondary"
					}
					value={inputData.card_number.replace(/\d{4}(?=.)/g, "$& ")}
					placeholder="Card Number"
					fullWidth={true}
					onChange={(e) => handleCardNumberInput(e)}
				/>
				<br />
				<br />
				<Input
					id="card-cvv"
					required
					color="default"
					value={inputData.card_cvv}
					placeholder="CVV"
					fullWidth={true}
					onChange={(e) => handleCardCvvInput(e)}
				/>
				<br />
				<br />
				<Input
					id="card-holder-name"
					required
					color="default"
					value={inputData.card_holder_name}
					placeholder="Card Holder Name"
					fullWidth={true}
					onChange={(e) =>
						setInputData({
							...inputData,
							card_holder_name: e.target.value,
						})
					}
				/>
				<br />
				<br />
				<b style={{ color: "gray" }}>Expiration date: </b>
				<br />
				<Grid container>
					<Grid xs={6} item>
						<Input
							id="card-expiration-date-year"
							required
							color="default"
							value={inputData.card_expiry_date_year}
							placeholder="Year"
							onChange={(e) => handleCardExpiryDateYearInput(e)}
						/>
					</Grid>
					<Grid xs={1} item></Grid>
					<Grid xs={5} item>
						<Input
							id="card-expiration-date-month"
							required
							color="default"
							value={inputData.card_expiry_date_month}
							placeholder="Month"
							onChange={(e) => handleCardExpiryDateMonthInput(e)}
						/>
					</Grid>
				</Grid>
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
		</fieldset>
	);
};

export default AddCard;
