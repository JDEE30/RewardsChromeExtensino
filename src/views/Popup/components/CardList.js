import { Card, CardHeader, IconButton } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

const CardList = () => {
	let arr = [
		{
			number: "123456789",
			cvv: 123,
			exp: 46542331564,
			name: "Md Minhazul Islam",
			vendor: "visa",
		},
		{
			number: "123456789",
			cvv: 123,
			exp: 46542331564,
			name: "Md Minhazul Islam",
			vendor: "amex",
		},
		{
			number: "123456789",
			cvv: 123,
			exp: 46542331564,
			name: "Md Minhazul Islam",
			vendor: "mastercard",
		},
	];

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

	return arr.map((card, index) => (
		<Card
			key={index}
			style={{ marginBottom: 5 }}
			onMouseEnter={(e) => toggleControlBtnVisibility(e)}
			onMouseLeave={(e) => toggleControlBtnVisibility(e)}
		>
			<CardHeader
				avatar={<img src={getIconUrlByVendor(card.vendor)} width="50px" height="50px" />}
				title={`Card Number: ${card.number.replace(/\d(?=\d{4})/g, "*")}`}
				subheader={`CVV: ${card.cvv}`}
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
	));
};

export default CardList;
