import { Card, CardHeader } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getDataFromStorage } from "../../common/storageUtil";
import "./App.css";

function App() {
	const [storageData, setStorageData] = useState({ card_data: {} });
	useEffect(() => {
		getDataFromStorage().then((response) => {
			setStorageData(response);
		});
	}, []);

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

	return (
		<div className="card-list">
			{Object.keys(storageData.card_data).length > 0 && (
				<React.Fragment>
					{Object.values(storageData.card_data).map((card) => (
						<Card key={card.card_number} style={{ marginBottom: 5 }}>
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
							></CardHeader>
						</Card>
					))}
				</React.Fragment>
			)}
			{Object.keys(storageData.card_data).length === 0 && <h2>No Data Found</h2>}
		</div>
	);
}

export default App;
