import React, { useEffect, useState } from "react";
import { addStorageChangeListener, getDataFromStorage } from "../../common/storageUtil";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IconButton, makeStyles } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import "./App.css";
import { PROJECT_NAME } from "../../common/constant";

const useStyles = makeStyles({
	table: {
		minWidth: "70%",
		maxWidth: "90%",
		margin: "auto",
	},
});

function App() {
	const [storageData, setStorageData] = useState({ card_data: {} });

	const classes = useStyles();

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

	const storageChangeListener = (changes, area) => {
		if (area === "local" && PROJECT_NAME in changes) {
			console.log(
				"new storage change",
				changes[PROJECT_NAME].newValue,
				changes[PROJECT_NAME].oldValue
			);
			setStorageData(changes[PROJECT_NAME].newValue);
		}
	};

	useEffect(() => {
		addStorageChangeListener(storageChangeListener);
		getDataFromStorage().then((response) => {
			setStorageData(response);
		});
	}, []);

	return (
		<div className="card-list">
			<center>
				<h1>Rewards</h1>
			</center>
			<TableContainer className={classes.table} component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center">
								<b>Vendor</b>
							</TableCell>
							<TableCell align="center">
								<b>Card Number</b>
							</TableCell>
							<TableCell align="center">
								<b>CVC</b>
							</TableCell>
							<TableCell align="center">
								<b>Name</b>
							</TableCell>
							<TableCell align="center">
								<b>Rewards</b>
							</TableCell>
						</TableRow>
					</TableHead>
					{Object.keys(storageData.card_data).length > 0 &&
						Object.values(storageData.card_data).map((card) => (
							<TableBody>
								<TableCell align="center">
									<img src={getIconUrlByVendor(card.issuer)} width="50px" />
								</TableCell>
								<TableCell align="center">{card.number}</TableCell>
								<TableCell align="center">{card.cvc}</TableCell>
								<TableCell align="center">{card.name}</TableCell>
								<TableCell align="center">
									{card.rewards.map((reward) => (
										<p>
											{reward.category} : {reward.point}x
										</p>
									))}
								</TableCell>
							</TableBody>
						))}
				</Table>
			</TableContainer>

			{Object.keys(storageData.card_data).length === 0 && (
				<center>
					<h2>No Data Found</h2>
				</center>
			)}
		</div>
	);
}

export default App;
