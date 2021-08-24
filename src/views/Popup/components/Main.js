import Toolbar from "@material-ui/core/Toolbar";
import Appbar from "@material-ui/core/AppBar";
import { useState } from "react";
import AddCardButton from "./AddCardButton";
import { ADD_CARD_PAGE, CARD_LIST_PAGE } from "../../../common/constant";
import CardList from "./CardList";
import AddCard from "./AddCard";

const Main = () => {
	const [pageNo, setPageNo] = useState(0);

	return (
		<div className="Main">
			<Appbar color="default">
				<Toolbar>
					<img
						src="creditCard.png"
						width="55px"
						height="55px"
						style={{
							position: "absolute",
							zIndex: 1,
							left: 135,
						}}
					/>
				</Toolbar>
			</Appbar>
			<Toolbar />
			{pageNo === CARD_LIST_PAGE && <CardList />}
			{pageNo === ADD_CARD_PAGE && <AddCard />}
			{<AddCardButton pageNo={pageNo} setPageNo={setPageNo} />}
		</div>
	);
};

export default Main;
