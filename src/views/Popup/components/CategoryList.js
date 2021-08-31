const CategoryList = (props) => {
	const { storageData, setStorageData } = props;
	const categoryData = storageData.category_data;
	const selectedCategory = storageData.selected_category;

	const handleInputChange = ({ target }) => {
		setStorageData({
			...storageData,
			selected_category: target.value,
		});
	};

	console.log(storageData);

	return (
		<div className="category-list">
			{categoryData.length > 0 && (
				<center>
					<h2>Preferred Credit Card Rewards</h2>
				</center>
			)}
			<div style={{ margin: 20 }}>
				{categoryData.map((category) => (
					<div id={category} style={{ margin: 10 }}>
						<input
							key={category}
							value={category}
							name="category"
							type="radio"
							defaultChecked={category === selectedCategory}
							onChange={handleInputChange}
						/>
						<b style={{ padding: 5, fontSize: 16 }}>{category}</b>
					</div>
				))}
			</div>
		</div>
	);
};

export default CategoryList;
