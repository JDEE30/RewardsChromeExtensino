import { Fab, Tooltip } from "@material-ui/core";
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
					<Fab
						aria-label="add-card"
						variant="circular"
						size="small"
						color="primary"
						onClick={() => handleAddCardButtonClick()}
					>
						<Tooltip title="Add Card" placement="left">
							<AddIcon />
						</Tooltip>
					</Fab>
				)}
				{pageNo === ADD_CARD_PAGE && (
					<Fab
						aria-label="go-back"
						variant="circular"
						size="small"
						color="secondary"
						onClick={() => handleAddCardButtonClick()}
					>
						<Tooltip title="Go back" placement="left">
							<ArrowBackIcon />
						</Tooltip>
					</Fab>
				)}
			</div>
		</React.Fragment>
	);
};

export default AddCardButton;
