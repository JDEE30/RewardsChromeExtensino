import {
	Button,
	FormControl,
	Grid,
	IconButton,
	Input,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	Tooltip,
} from "@material-ui/core";
import React, { useState } from "react";
import { CARD_LIST_PAGE } from "../../../common/constant";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

import {
	formatCreditCardNumber,
	formatCVC,
	formatExpirationDate,
	formatFormData,
	verifyFormData,
} from "./CardDataUtil";
import { fns } from "payment";
import AddCircleOutlined from "@material-ui/icons/AddCircleOutlined";

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
					rewards: [{ category: "", point: "" }],
					focused: "",
			  }
	);

	const categoryData = storageData.category_data;

	const handleInputDataSubmit = () => {
		if (verifyFormData(editCard, storageData, inputData, handleOpenInfoAlert)) {
			let tempStorageData = {
				...storageData,
				card_data: {
					...storageData.card_data,
					[inputData.number]: { ...inputData },
				},
			};
			setStorageData(tempStorageData);
			console.log("storage data updated!!");
			if (editCard) {
				handleOpenInfoAlert("success", "Card edited successfully!!");
			} else {
				handleOpenInfoAlert("success", "Card added successfully!!");
			}
			setPageNo(CARD_LIST_PAGE);
			setEditCard(null);
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
		console.log(target);
		if (target.name === "number") {
			target.value = formatCreditCardNumber(target.value);
		} else if (target.name === "expiry") {
			target.value = formatExpirationDate(target.value);
		} else if (target.name === "cvc") {
			target.value = formatCVC(target.value);
		} else if (target.name === "reward" + target.id) {
			const temp = inputData.rewards;
			temp[target.id] = { ...inputData.rewards[target.id], point: target.value };
			console.log(temp);
			setInputData({ ...inputData, rewards: [...temp] });
			return;
		} else if (target.name === "category" + target.id) {
			const temp = inputData.rewards;
			temp[target.id] = { ...inputData.rewards[target.id], category: target.value };
			console.log(temp);
			setInputData({ ...inputData, rewards: [...temp] });
			return;
		}
		setInputData({ ...inputData, [target.name]: target.value });
	};

	const handleAddInputClick = () => {
		setInputData({
			...inputData,
			rewards: [...inputData.rewards, { category: "", point: "" }],
		});
	};

	return (
		<div className="add-card">
			<center>
				<h2>{editCard ? "Edit Card" : "Add Card"}</h2>
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
				autoComplete={false}
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
				autoComplete={false}
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
						autoComplete={false}
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
						id="card-cvc"
						type="tel"
						name="cvc"
						autoComplete={false}
						value={inputData.cvc}
						placeholder="CVC"
						fullWidth={true}
						pattern="\d{3,4}"
						onChange={handleInputChange}
						onFocus={handleInputFocus}
					/>
				</Grid>
			</Grid>
			<input type="hidden" name="issuer" value={inputData.issuer} />
			{inputData.rewards.map((reward, index) => (
				<React.Fragment>
					<br />
					<br />
					<Grid container key={"card-reward" + index}>
						<Grid xs={5} item>
							<FormControl style={{ minWidth: 120 }}>
								<Select
									native
									id={index}
									name={"category" + index}
									value={reward.category}
									onChange={handleInputChange}
									onFocus={handleInputFocus}
								>
									<option value="">Select Category</option>
									{categoryData.map((category) => (
										<option value={category}>{category}</option>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid xs={1} item></Grid>
						<Grid xs={6} item>
							<Input
								required
								id={index}
								type="tel"
								name={"reward" + index}
								autoComplete={false}
								value={reward.point}
								placeholder="Reward point"
								pattern="\d+"
								onChange={handleInputChange}
								onFocus={handleInputFocus}
							/>
						</Grid>
					</Grid>
				</React.Fragment>
			))}
			<Tooltip title="Add another" placement="right">
				<IconButton
					size="small"
					color="secondary"
					onClick={() => handleAddInputClick()}
					style={{ float: "right" }}
				>
					<AddCircleOutlined />
				</IconButton>
			</Tooltip>
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
			<br />
		</div>
	);
};

export default AddCard;
