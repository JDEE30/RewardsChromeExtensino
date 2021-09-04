import { Button, Grid } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Appbar from "@material-ui/core/AppBar";
import {
	ADD_CARD_PAGE,
	ADD_CATEGORY_PAGE,
	BEST_CARD_PAGE,
	CARD_LIST_PAGE,
	CATEGORY_LIST_PAGE,
} from "../../../common/constant";

const Navbar = (props) => {
	const { pageNo, setPageNo } = props;

	const handleButtonClick = (type) => {
		if (type === 2) {
			switch (pageNo) {
				case CATEGORY_LIST_PAGE:
					setPageNo(ADD_CATEGORY_PAGE);
					break;
				case ADD_CATEGORY_PAGE:
					setPageNo(CATEGORY_LIST_PAGE);
					break;
				case CARD_LIST_PAGE:
					setPageNo(ADD_CARD_PAGE);
					break;
				case ADD_CARD_PAGE:
					setPageNo(CARD_LIST_PAGE);
					break;
				case BEST_CARD_PAGE:
					setPageNo(CATEGORY_LIST_PAGE);
					break;
				default:
					break;
			}
		} else if (type === 1) {
			switch (pageNo) {
				case CATEGORY_LIST_PAGE:
					setPageNo(CARD_LIST_PAGE);
					break;
				case CARD_LIST_PAGE:
					setPageNo(CATEGORY_LIST_PAGE);
				default:
					break;
			}
		}
	};

	const getButtonLabel = (type) => {
		if (type === 1) {
			switch (pageNo) {
				case CATEGORY_LIST_PAGE:
					return "CARDS";
				case CARD_LIST_PAGE:
					return "BACK";
			}
		} else if (type === 2) {
			switch (pageNo) {
				case CATEGORY_LIST_PAGE:
				case CARD_LIST_PAGE:
					return "ADD";
				case ADD_CATEGORY_PAGE:
				case ADD_CARD_PAGE:
				case BEST_CARD_PAGE:
					return "BACK";
			}
		}
	};

	return (
		<div className="navbar">
			<Appbar color="default">
				<Toolbar>
					<img src="creditCard.png" width="55px" height="55px" />
					<Grid container justifyContent="flex-end" alignItems="center">
						{(pageNo === CATEGORY_LIST_PAGE || pageNo === CARD_LIST_PAGE) && (
							<Button
								size="small"
								variant="contained"
								color="primary"
								style={{ marginRight: 5 }}
								onClick={() => handleButtonClick(1)}
							><b>{getButtonLabel(1)}</b></Button>
						)}
						<Button
							size="small"
							variant="contained"
							color="primary"
							onClick={() => handleButtonClick(2)}
						><b>{getButtonLabel(2)}</b></Button>
					</Grid>
				</Toolbar>
			</Appbar>
			<Toolbar />
		</div>
	);
};

export default Navbar;
