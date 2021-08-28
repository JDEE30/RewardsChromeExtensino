import React, { useState } from "react";

const AddCategory = (props) => {
	const { categories, setCategories, setPageNo } =
		props;


		console.log('Add Category Page');
	return (
		<div className="addCategory">
			<h2>Add New Category</h2>
		</div>
	);
};

export default AddCategory;