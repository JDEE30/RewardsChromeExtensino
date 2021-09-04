import React, { useState } from "react";
import { Button, IconButton, Input, Tooltip } from "@material-ui/core";
import AddCircleOutlined from "@material-ui/icons/AddCircleOutlined";
import { CATEGORY_LIST_PAGE } from "../../../common/constant";

const AddCategory = (props) => {
	const { storageData, setStorageData, handleOpenInfoAlert, setPageNo } = props;
	const [rewardCategory, setRewardCategory] = useState([""]);

	const handleInputDataSubmit = () => {
		if (
			rewardCategory.filter(
				(category) => storageData.category_data.indexOf(category.toLowerCase()) >= 0
			).length > 0
		) {
			handleOpenInfoAlert("error", "Category already exist!!");
		} else {
			handleOpenInfoAlert("success", "Category Added successfully");
			const temp = rewardCategory
				.filter((category) => category.length > 0)
				.map((category) => category.toLowerCase());
			setStorageData({
				...storageData,
				category_data: [...storageData.category_data, ...temp],
			});
			setPageNo(CATEGORY_LIST_PAGE);
		}
	};

	const handleInputChange = ({ target }) => {
		const temp = rewardCategory;
		temp[target.id] = target.value;
		setRewardCategory([...temp]);
	};

	const handleAddInputClick = () => {
		setRewardCategory([...rewardCategory, ""]);
	};

	console.log(rewardCategory);

	return (
		<React.Fragment>
			<center>
				<h2>Add Reward Category</h2>
				{rewardCategory.map((item, index) => (
					<div>
						<br />
						<Input
							required
							key={`reward-category-${index}`}
							id={index}
							name="category"
							autoComplete={false}
							value={item}
							placeholder="Category Name"
							onChange={handleInputChange}
						/>
					</div>
				))}
				<Tooltip title="Add another" placement="right">
					<IconButton size="small" color="secondary" onClick={handleAddInputClick}>
						<AddCircleOutlined />
					</IconButton>
				</Tooltip>
				<br />
				<br />
				<Button
					variant="contained"
					size="small"
					color="primary"
					onClick={() => handleInputDataSubmit()}
				>
					Save Category
				</Button>
			</center>
		</React.Fragment>
	);
};

export default AddCategory;
