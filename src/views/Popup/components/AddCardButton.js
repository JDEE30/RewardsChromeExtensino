import { Button, Fab, Tooltip } from "@material-ui/core";
import React from "react";
import { ADD_CARD_PAGE, CARD_LIST_PAGE } from "../../../common/constant";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const AddCardButton = (props) => {
	const { pageNo, setPageNo } = props;

	const handleAddCardButtonClick = () => {
		if (pageNo === CARD_LIST_PAGE) {
			setPageNo(ADD_CARD_PAGE);
		} else if (pageNo === ADD_CARD_PAGE) {
			setPageNo(CARD_LIST_PAGE);
		}
	};

	return (
		<React.Fragment>
			<div className="add-card-data-button">
				{pageNo === CARD_LIST_PAGE && (
					<Button
						size="small"
						variant="contained"
						color="primary"
						onClick={() => handleAddCardButtonClick()}
					>
						<b>ADD</b>
					</Button>
				)}
				{pageNo === ADD_CARD_PAGE && (
					<Button
						size="small"
						variant="contained"
						color="secondary"
						onClick={() => handleAddCardButtonClick()}
					>
						<b>BACK</b>
					</Button>
				)}
			</div>
		</React.Fragment>
	);
};

export default AddCardButton;
