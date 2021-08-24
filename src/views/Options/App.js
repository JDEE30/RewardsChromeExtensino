import { DataGrid } from "@material-ui/data-grid";
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

	const columns = [
		{ field: "id", headerName: "ID", width: "200" },
		{ field: "card_number", headerName: "Card Number", width: "200" },
		{ field: "card_cvv", headerName: "Card CVV", width: "200" },
		{ field: "card_vendor", headerName: "Card Vendor", width: "200" },
		{ field: "card_holder_name", headerName: "Name", width: "200" },
	];

	return (
		<div className="card-list" style={{ height: 400, width: "100%" }}>
			<h1 style={{ textAlign: "center" }}>Card Data Auto Complete</h1>
			{Object.keys(storageData.card_data).length >= 0 && (
				<DataGrid
					rows={Object.values(storageData.card_data).map((card, index) => ({
						...card,
						id: index,
					}))}
					columns={columns}
					pageSize={100}
					rowsPerPageOptions={[10]}
					disableSelectionOnClick
				/>
			)}
			{Object.keys(storageData.card_data).length === 0 && <h2>No Data Found</h2>}
		</div>
	);
}

export default App;
