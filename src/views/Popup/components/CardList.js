import { Card, CardHeader, IconButton } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import NoDataFound from "./NoDataFound";

const CardList = (props) => {
	const { storageData, editCard, setEditCard } = props;

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

	return (
		<div className="card-list">
			{Object.keys(storageData.card_data).length > 0 &&
				Object.values(storageData.card_data).map((card) => (
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
							title={`Card Number: ${card.card_number.replace(/\d(?=\d{4})/g, "*")}`}
							subheader={`CVV: ${card.card_cvv}`}
							action={
								<span class="control-btn" style={{ visibility: "hidden" }}>
									<IconButton size="small" color="primary">
										<EditIcon />
									</IconButton>
									<br />
									<IconButton size="small" color="secondary">
										<DeleteForeverIcon />
									</IconButton>
								</span>
							}
						></CardHeader>
					</Card>
				))}
			{Object.keys(storageData.card_data).length === 0 && <NoDataFound />}
		</div>
	);
};

export default CardList;
