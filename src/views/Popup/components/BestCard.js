import React, { useState } from "react";

const BestCard = (props) => {
	const { categories, setCategories, setPageNo } =
		props;


		console.log('Best Card Page');
	return (
		<div className="bestCard">
			<h2>The Best Card For *Category* is:</h2>
		</div>
	);
};

export default BestCard;