import React, { useState } from "react";
import NoDataFound from "./NoDataFound";

const CategoryList = (props) => {
	const { categories, setCategories, setPageNo } =
		props;


		console.log('A:', JSON.stringify(categories));
		console.log('Categories Length:', Object.keys(categories)?.length);
		console.log('B:',  JSON.stringify(categories));
	return (
		<div className="categories">
			{Object.keys(categories)?.length === 0 && <NoDataFound />}
		</div>
	);
};

export default CategoryList;