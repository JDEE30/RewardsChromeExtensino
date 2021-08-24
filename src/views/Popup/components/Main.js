import Toolbar from "@material-ui/core/Toolbar";
import Appbar from "@material-ui/core/AppBar";
import { useEffect, useState } from "react";
import AddCardButton from "./AddCardButton";
import { ADD_CARD_PAGE, CARD_LIST_PAGE } from "../../../common/constant";
import CardList from "./CardList";
import AddCard from "./AddCard";
import { getDataFromStorage, setDataInStorage } from "../../../common/storageUtil";
import InfoAlert from "./InfoAlert";

const Main = () => {
	const [pageNo, setPageNo] = useState(0);
	const [storageData, setStorageData] = useState({ card_data: {} });
	const [editCard, setEditCard] = useState(null);
	const [alertData, setAlertData] = useState({
		isOpen: false,
		hideDuration: 3000,
		severity: "success",
		message: "",
	});

	const handleOpenInfoAlert = (type, message) => {
		setAlertData({
			...alertData,
			isOpen: true,
			severity: type,
			message,
		});
	};

	useEffect(() => {
		if (pageNo === CARD_LIST_PAGE) setEditCard(null);
	}, [pageNo]);

	useEffect(() => {
		getDataFromStorage().then((response) => {
			if (response) {
				console.log("Storage Data loaded!!");
				setStorageData(response);
			}
		});
	}, []);

	return (
		<div className="Main">
			<Appbar color="default">
				<Toolbar>
					<img src="creditCard.png" width="55px" height="55px" />
					<span style={{ position: "absolute", right: 8 }}>
						<AddCardButton pageNo={pageNo} setPageNo={setPageNo} />
					</span>
				</Toolbar>
			</Appbar>
			<Toolbar />
			{pageNo === CARD_LIST_PAGE && (
				<CardList
					storageData={storageData}
					setStorageData={setStorageData}
					editCard={editCard}
					setEditCard={setEditCard}
					setPageNo={setPageNo}
					handleOpenInfoAlert={handleOpenInfoAlert}
				/>
			)}
			{pageNo === ADD_CARD_PAGE && (
				<AddCard
					storageData={storageData}
					setStorageData={setStorageData}
					editCard={editCard}
					setEditCard={setEditCard}
					handleOpenInfoAlert={handleOpenInfoAlert}
					setPageNo={setPageNo}
				/>
			)}
			{<InfoAlert alertData={alertData} setAlertData={setAlertData} />}
		</div>
	);
};

export default Main;
