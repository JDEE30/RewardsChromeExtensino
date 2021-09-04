import { useEffect, useRef, useState } from "react";
import {
	ADD_CARD_PAGE,
	ADD_CATEGORY_PAGE,
	BEST_CARD_PAGE,
	CARD_LIST_PAGE,
	CATEGORY_LIST_PAGE,
} from "../../../common/constant";
import CardList from "./CardList";
import AddCard from "./AddCard";
import { getDataFromStorage, setDataInStorage } from "../../../common/storageUtil";
import InfoAlert from "./InfoAlert";
import Navbar from "./Navbar";
import CategoryList from "./CategoryList";
import AddCategory from "./AddCategory";
import BestCard from "./BestCard";

const Main = () => {
	const [pageNo, setPageNo] = useState(CATEGORY_LIST_PAGE);
	const [editCard, setEditCard] = useState(null);
	const [alertData, setAlertData] = useState({
		isOpen: false,
		hideDuration: 3000,
		severity: "success",
		message: "",
	});
	const [storageData, setStorageData] = useState({
		card_data: {},
		category_data: [],
		selected_category: "",
		selected_card: "",
	});

	const fristTime = useRef(true);

	const handleOpenInfoAlert = (type, message) => {
		setAlertData({
			...alertData,
			isOpen: true,
			severity: type,
			message,
		});
	};

	useEffect(() => {
		if (fristTime.current) {
			fristTime.current = false;
			return;
		}
		setDataInStorage(storageData);
	}, [storageData]);

	useEffect(() => {
		if (pageNo === CARD_LIST_PAGE) setEditCard(null);
	}, [pageNo]);

	useEffect(() => {
		getDataFromStorage().then((response) => {
			if (response) {
				console.log("Storage Data loaded!!");
				setStorageData({ ...storageData, ...response });
			}
		});
	}, []);

	return (
		<div className="Main">
			<Navbar pageNo={pageNo} setPageNo={setPageNo} />
			{pageNo === CATEGORY_LIST_PAGE && (
				<CategoryList
					storageData={storageData}
					setStorageData={setStorageData}
					setPageNo={setPageNo}
				/>
			)}
			{pageNo === ADD_CATEGORY_PAGE && (
				<AddCategory
					storageData={storageData}
					setStorageData={setStorageData}
					handleOpenInfoAlert={handleOpenInfoAlert}
					setPageNo={setPageNo}
				/>
			)}
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
			{pageNo === BEST_CARD_PAGE && (
				<BestCard storageData={storageData} setStorageData={setStorageData} />
			)}
			{<InfoAlert alertData={alertData} setAlertData={setAlertData} />}
		</div>
	);
};

export default Main;
