import {
	Button,
	Card,
	CardHeader,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import React, { useState } from "react";
import { ADD_CARD_PAGE } from "../../../common/constant";
import NoDataFound from "./NoDataFound";

const CardList = (props) => {
	const { storageData, setStorageData, editCard, setEditCard, setPageNo, handleOpenInfoAlert } =
		props;
	const [deleteCardConfirmationDialogState, setDeleteCardConfirmationDialogState] =
		useState(false);
	const [deleteCard, setDeleteCard] = useState(null);

	const getIconUrlByVendor = (vendor) => {
		let src = "creditCard.png";
		switch (vendor) {
			case "visa":
				src = "visa.png";
				break;
			case "jcb":
				src = "jcb.png";
				break;
			case "mastercard":
				src = "mastercard.png";
				break;
			case "amex":
				src = "amex.png";
				break;
			case "discover":
				src = "discover.png";
				break;
			case "maestro":
				src = "maestro.png";
				break;
			default:
				break;
		}
		return src;
	};

	const toggleControlBtnVisibility = (e) => {
		if (e.type === "mouseenter") {
			e.target.querySelector(".control-btn")?.setAttribute("style", "visibility: visible");
		} else if (e.type === "mouseleave") {
			e.target.querySelector(".control-btn")?.setAttribute("style", "visibility: hidden");
		}
	};

	const handleDeleteCard = () => {
		setDeleteCardConfirmationDialogState(false);
		let tempStorageData = {
			...storageData,
			card_data: Object.entries(storageData.card_data)
				.filter((card) => card[1].card_number !== deleteCard)
				.reduce((obj, card) => ({ ...obj, [card[0]]: card[1] }), {}),
		};
		setStorageData(tempStorageData);
		console.log("storage data updated!!");
		handleOpenInfoAlert("success", "Card deleted successfully!!");
	};

	const handleDeleteCardConfirmationDialog = () => (
		<Dialog
			open={deleteCardConfirmationDialogState}
			onClose={() => setDeleteCardConfirmationDialogState(false)}
			aria-labelledby="form-dialog-title"
			fullWidth={true}
			maxWidth={"md"}
		>
			<DialogTitle id="form-dialog-title">Delete Card</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Delete the card?
					<br />
					Are you sure?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => handleDeleteCard()} color="primary">
					Yes
				</Button>
				<Button
					onClick={() => setDeleteCardConfirmationDialogState(false)}
					color="Secondary"
				>
					No
				</Button>
			</DialogActions>
		</Dialog>
	);

	const handleEditButtonClick = (cardNumber) => {
		setEditCard(cardNumber);
		setPageNo(ADD_CARD_PAGE);
	};

	const handleDeleteButtonClick = (cardNumber) => {
		setDeleteCardConfirmationDialogState(true);
		setDeleteCard(cardNumber);
	};

	return (
		<div className="card-list">
			{Object.keys(storageData.card_data).length > 0 && (
				<React.Fragment>
					{Object.values(storageData.card_data).map((card) => (
						<Card
							key={card.card_number}
							style={{ marginBottom: 5 }}
							onMouseEnter={(e) => toggleControlBtnVisibility(e)}
							onMouseLeave={(e) => toggleControlBtnVisibility(e)}
						>
							<CardHeader
								avatar={
									<img
										src={getIconUrlByVendor(card.card_vendor)}
										width="50px"
										height="50px"
									/>
								}
								title={`Number: ${card.card_number.replace(/\d(?=\d{4})/g, "*")}`}
								subheader={`CVV: ${card.card_cvv}`}
								action={
									<span class="control-btn" style={{ visibility: "hidden" }}>
										<IconButton
											size="small"
											color="primary"
											onClick={() => handleEditButtonClick(card.card_number)}
										>
											<EditIcon />
										</IconButton>
										<br />
										<IconButton
											size="small"
											color="secondary"
											onClick={() =>
												handleDeleteButtonClick(card.card_number)
											}
										>
											<DeleteForeverIcon />
										</IconButton>
									</span>
								}
							></CardHeader>
						</Card>
					))}
					{handleDeleteCardConfirmationDialog()}
				</React.Fragment>
			)}
			{Object.keys(storageData.card_data).length === 0 && <NoDataFound />}
		</div>
	);
};

export default CardList;
